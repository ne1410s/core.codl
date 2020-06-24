import 'reflect-metadata';
import { Ctor } from '../../types';
import { ValidationKey, MetadataKey } from '../../mdkeys';
import { ValidationSummary, ValidationResult, ValidatorDef, ValidationInstruction } from './models';
import { RequiredValidator } from './validators/required';
import { RegexValidator } from './validators/regex';
import { RangeValidator } from './validators/range';
import { CustValidator } from './validators/custom';
import { LengthRangeValidator } from './validators/length-range';

/** Reflects validation decoration. */
export abstract class ReflectValidation {

  public static validate<T extends Object>(target: Object, type?: Ctor<T>): ValidationSummary {
    const proto = type?.prototype || Object.getPrototypeOf(target || {});
    if (!proto) throw new TypeError('No type data could be found');
    const validators = this.getValidators();
    const tests = ReflectValidation.buildTestPlan(validators, proto, target);
    const results: ValidationResult[] = tests.map(t => {
      return { navkey: t.navkey, tests: t.tests, ...t.fn(t.trg, t.key, t.proto) };
    });
    const retVal: ValidationSummary = { valid: results.every(r => r.valid) };
    if (!retVal.valid) {
      retVal.errors = results.filter(r => !r.valid).reduce((acc, cur) => {
        acc[cur.navkey] = acc[cur.navkey] || [];
        acc[cur.navkey].push(cur.message);
        return acc;
      }, {} as Record<string, string[]>)
    }

    return retVal;
  }

  /** 
   * Gets all available tests and their associated validator. There is expected
   * duplication where one validator is used to perform multiple tests.
   */
  private static getValidators() {
    return Object.keys(ValidationKey).map(test => {
      const meta = (ValidationKey as any)[test] as ValidationKey;
      const fn = ReflectValidation.getValidator(meta);
      return { fn, test, meta };
    });  
  }

  /** Gets the validator function for a given key. */
  private static getValidator(key: string) {
    switch (key) {
      
      case ValidationKey.MIN_LENGTH:
      case ValidationKey.MAX_LENGTH:
        return LengthRangeValidator;

      case ValidationKey.MIN:
      case ValidationKey.MAX:
        return RangeValidator;
        
      case ValidationKey.REQUIRED: return RequiredValidator;
      case ValidationKey.REGEX: return RegexValidator;
      case ValidationKey.CUSTOM: return CustValidator;

      default:
        throw new RangeError(`No validator implemented for ${key}`);
    }
  }

  private static buildTestPlan(dupeDefs: ValidatorDef[], proto: any, trg: Object, pfx: string = ''): ValidationInstruction[] {  
    return Reflect.getMetadataKeys(proto)
      .map(k => `${k}`)
      .reduce((acc, cur) => {
        const valDef = dupeDefs.filter(dg => cur.indexOf(dg.meta + ':') === 0)[0];  
        if (valDef) {
          const key = cur.replace(valDef.meta + ':', '');
          const prior = acc.filter(a => a.key === key && a.fn === valDef.fn)[0];
          const navkey = pfx ? `${pfx}.${key}` : key;
          if (prior) prior.tests.push(valDef.test);
          else acc.push({ navkey, key, trg, proto, fn: valDef.fn, tests: [valDef.test] });
        }
        else if (cur.indexOf(`${MetadataKey.TYPE}:`) === 0) {
          const subkey = cur.replace(`${MetadataKey.TYPE}:`, '');
          const subproto = Reflect.getMetadata(cur, proto).prototype;
          const subobj = (trg as any || {})[subkey];
          if (Array.isArray(subobj)) {
            subobj.forEach((subitem, i) => {
              const subpfx = pfx ? `${pfx}.${subkey}[${i}]` : `${subkey}[${i}]`;
              acc.push(...ReflectValidation.buildTestPlan(dupeDefs, subproto, subitem || {}, subpfx));
            });
          } else if (subobj) {
            const subpfx = pfx ? `${pfx}.${subkey}` : subkey;
            acc.push(...ReflectValidation.buildTestPlan(dupeDefs, subproto, subobj, subpfx));
          }
        }
        return acc;
      }, [] as ValidationInstruction[])
      .sort((a, b) => a.navkey.split('.').length - b.navkey.split('.').length)
  }
}