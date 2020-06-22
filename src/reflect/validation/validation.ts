import 'reflect-metadata';
import { ValidationKey } from '../../shared-keys';
import { Validator, ValidatorOut } from './model';
import { RequiredValidator } from './validators/required';
import { RegexValidator } from './validators/regex';
import { RangeValidator } from './validators/range';
import { CustomValidator } from './validators/custom';
import { LengthRangeValidator } from './validators/length-range';

/** Reflects validation decoration. */
export abstract class ReflectValidation {

  public static validate(target: Object): ValidationSummary {
    if (!target) throw new TypeError('No target provided');
    const validators = this.getValidators();
    const results = ReflectValidation.processAllRecursively(validators, target);
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

  /** Performs all supported validations for all decorated properties. */
  private static processAllRecursively(dupeDefs: ValidatorDef[], trg: Object, pfx: string = ''): ValidationResult[] {

    const deDuped = Reflect.getMetadataKeys(trg).map(t => `${t}`).reduce((acc, cur) => {
      const raw = dupeDefs.filter(dg => cur.indexOf(dg.meta + ':') === 0)[0];
      const key = cur.replace(raw.meta + ':', '');
      const prior = acc.filter(a => a.key === key && a.fn === raw.fn)[0];
      if (prior) prior.tests.push(raw.test);
      else acc.push({ key: key, fn: raw.fn, tests: [raw.test] });
      return acc;
    }, [] as ValidationDef[]);

    const retVal = deDuped.map(d => ({ key: pfx ? pfx + '.' + d.key : d.key, tests: d.tests, ...d.fn(trg, d.key) }));

    //console.log(pfx || '{PARENT}', '-->', retVal.filter(r => r.valid).length, '/', retVal.length, 'test(s) passed');

    Object.getOwnPropertyNames(trg)
      .map(key => ({ key, value: (trg as any)[key] }))
      .filter(kvp => kvp.value instanceof Object)
      .forEach(kvp => {

        if (!isNaN(parseInt(kvp.key))) kvp.key = `[${kvp.key}]`;

        //console.log('PROTO0 - META:', Reflect.getMetadataKeys(kvp.value));
        //console.log('PROTO1 - META:', Reflect.getMetadataKeys(kvp.value.constructor));
        //console.log('PROTO2 - META', Reflect.getMetadataKeys(Object.getPrototypeOf(kvp.value)));

        retVal.push(...this.processAllRecursively(dupeDefs, kvp.value, pfx + kvp.key));
      });

    return retVal;
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

interface ValidationDef {
  key: string;
  fn: Validator;
  tests: string[];

}

interface ValidationResult extends ValidatorOut {
  key: string;
  tests: string[];
}