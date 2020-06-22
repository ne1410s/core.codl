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
    const results = ReflectValidation.processAll(target);
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
  private static processAll(trg: Object): ValidationResult[] {

    const dupeGroups = Object.keys(ValidationKey).map(test => {
      const meta = (ValidationKey as any)[test] as ValidationKey;
      const fn = ReflectValidation.getValidator(meta);
      return { fn, test, meta };
    });
    
    const defs = Reflect.getMetadataKeys(trg).map(t => `${t}`).reduce((acc, cur) => {
      const raw = dupeGroups.filter(dg => cur.indexOf(dg.meta + ':') === 0)[0];
      const key = cur.replace(raw.meta + ':', '');
      const prior = acc.filter(a => a.key === key && a.fn === raw.fn)[0];
      if (prior) prior.tests.push(raw.test);
      else acc.push({ key, fn: raw.fn, tests: [raw.test] });
      return acc;
    }, [] as ValidationDef[]);
    
    return defs.map(d => ({ key: d.key, tests: d.tests, ...d.fn(trg, d.key) }));  
  }
}

export interface ValidationSummary {
  valid: boolean;
  errors?: Record<string, string[]>
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