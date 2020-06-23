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

  public static validate<T extends Object>(type: Ctor<T>, target: Object): ValidationSummary {
    if (!target) throw new TypeError('No target provided');
    const validators = this.getValidators();
    const tests = ReflectValidation.buildTestPlan(validators, type, target);
    const results: ValidationResult[] = tests.map(t => ({ key: t.key, tests: t.tests, ...t.fn(t.trg, t.key, t.type.prototype) }))
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

  private static buildTestPlan<T>(dupeDefs: ValidatorDef[], type: Ctor<T>, trg: Object, pfx: string = ''): ValidationInstruction[] {  
    
    return Reflect.getMetadataKeys(type.prototype)
      .map(k => `${k}`)
      .reduce((acc, cur) => {
        const valDef = dupeDefs.filter(dg => cur.indexOf(dg.meta + ':') === 0)[0];  
        if (valDef) {
          const key = cur.replace(valDef.meta + ':', '');
          const prior = acc.filter(a => a.key === key && a.fn === valDef.fn)[0];
          if (prior) prior.tests.push(valDef.test);
          else acc.push({ key, trg, type, fn: valDef.fn, tests: [valDef.test], });
        }
        else if (cur.indexOf(`${MetadataKey.TYPE}:`) === 0) {
          const subkey = cur.replace(`${MetadataKey.TYPE}:`, '');
          const subtype = Reflect.getMetadata(cur, type.prototype);
          const subobj = (trg as any || {})[subkey];
          if (subobj) { // skip subtype if nothing defined (required is still checked)
            acc.push(...ReflectValidation.buildTestPlan(dupeDefs, subtype, subobj, pfx + '.' + subkey));
          }
        }
        return acc;
      }, [] as ValidationInstruction[]);
    
    // TODO: Drill-down keys
    // TODO: Check array items behaviour!
    // TODO: Swap params order on valdiate()
      // (so that type param is 2nd and optional - throw runtime error if no proto can be inferred)

    //const retVal = deDuped.map(d => ({ key: pfx ? pfx + '.' + d.key : d.key, tests: d.tests, ...d.fn(trg, d.key) }));

    // Object.getOwnPropertyNames(trg)
    //   .map(key => ({ key, value: (trg as any)[key] }))
    //   .filter(kvp => kvp.value instanceof Object)
    //   .forEach(kvp => {
    //     if (!isNaN(parseInt(kvp.key))) kvp.key = `[${kvp.key}]`;
    //     retVal.push(...this.processAllRecursively(dupeDefs, kvp.value, pfx + kvp.key));
    //   });
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
  key: string;
  trg: Object;
  type: Ctor<Object>;
  fn: Validator;
  tests: string[];
}

interface ValidationResult extends ValidatorOut {
  key: string;
  tests: string[];
}