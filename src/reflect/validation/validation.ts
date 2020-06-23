import 'reflect-metadata';
import { Ctor } from '../../types';
import { ValidationKey, MetadataKey } from '../../shared-keys';
import { Validator, ValidatorOut } from './model';
import { RequiredValidator } from './validators/required';
import { RegexValidator } from './validators/regex';
import { RangeValidator } from './validators/range';
import { CustomValidator } from './validators/custom';
import { LengthRangeValidator } from './validators/length-range';

/** Reflects validation decoration. */
export abstract class ReflectValidation {

  public static validate<T extends Object>(target: Object, type?: Ctor<T>): ValidationSummary {
    const proto = type?.prototype || Object.getPrototypeOf(target || {});
    if (!proto) throw new TypeError('No type data could be found');
    const validators = this.getValidators();
    const tests = ReflectValidation.buildTestPlan(validators, proto, target);
    const results: ValidationResult[] = tests.map(t => {
      const output = t.fn(t.trg, t.key, t.proto);
      const key = t.pfx ? `${t.pfx}.${t.key}` : t.key;
      return { key, tests: t.tests, ...output };
    });
    const retVal: ValidationSummary = { valid: results.every(r => r.valid) };
    if (!retVal.valid) {
      retVal.errors = results.filter(r => !r.valid).reduce((acc, cur) => {
        acc[cur.key] = acc[cur.key] || [];
        acc[cur.key].push(cur.message);
        return acc;
      }, {} as Record<string, string[]>);
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
      case ValidationKey.CUSTOM: return CustomValidator;

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
          if (prior) prior.tests.push(valDef.test);
          else acc.push({ pfx, key, trg, proto, fn: valDef.fn, tests: [valDef.test] });
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
      }, [] as ValidationInstruction[]);
  }
}

export interface ValidationSummary {
  valid: boolean;
  errors?: Record<string, string[]>
}

interface ValidatorDef {
  fn: Validator;
  test: string;
  meta: ValidationKey;
}

interface ValidationInstruction {
  pfx: string;
  key: string;
  trg: Object;
  proto: any;
  fn: Validator;
  tests: string[];
}

interface ValidationResult extends ValidatorOut {
  key: string;
  tests: string[];
}