import 'reflect-metadata';
import { ValidationKey } from '../../shared-keys';
import { Validator, ValidatorOut } from './model';
import { RequiredValidator } from './validators/required';
import { RegexValidator } from './validators/regex';

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

  /** Gets definitions for each supported validation method. */
  private static getDefinitions(): ValidationDef[] {
    return Object.keys(ValidationKey).map(test => {
      const meta = (ValidationKey as any)[test] as ValidationKey;
      return { test, meta, fn: ReflectValidation.getValidator(meta) };
    });
  }

  /** Gets the validator function for a given key. */
  private static getValidator(key: string) {
    switch (key) {
      case ValidationKey.REGEX: return RegexValidator;
      case ValidationKey.REQUIRED: return RequiredValidator;
      default: throw new RangeError(`No validator implemented for ${key}`);
    }
  }

  /** Performs all supported validations for all decorated properties. */
  private static processAll(trg: Object): ValidationResult[] {
    const allDefs = ReflectValidation.getDefinitions();
    return Reflect.getMetadataKeys(trg).reduce((acc: ValidationResult[], cur) => {
      acc.push(...allDefs
        .filter(d => `${cur}`.indexOf(d.meta + ':') === 0)
        .map(def => {
          const key = `${cur}`.replace(def.meta + ':', '');
          return { ...def.fn(trg, key), key, test: def.test };
        }));
      return acc;
    }, []) as ValidationResult[];
  }
}

export interface ValidationSummary {
  valid: boolean;
  errors?: Record<string, string[]>
}

interface ValidationDef {
  fn: Validator;
  test: string;
  meta: ValidationKey;
}

interface ValidationResult extends ValidatorOut {
  key: string;
  test: string;
}