import 'reflect-metadata';
import { ValidationKey } from '../shared-keys';

declare type Validator = (trg: Object, key: string, test: string) => ValidationResult;

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

  /** Validates required items. 0, 0n and false are allowed */
  private static validateRequired: Validator = (trg, key, test) => {
    const value = (trg as any)[key];
    const required = Reflect.getMetadata(ValidationKey.REQUIRED, trg, key) === true;
    const present = value !== null && value !== undefined && value !== NaN && value !== '';
    const valid = present || !required;
    const message = valid ? undefined : `${key.toString()} is required`;
    return { key, value, test, valid, message } as ValidationResult;
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
      case ValidationKey.REQUIRED: return ReflectValidation.validateRequired;
      default: throw new RangeError(`No validator implemented for ${key}`);
    }
  }

  /** Performs all supported validations for all decorated properties. */
  private static processAll(trg: Object): ValidationResult[] {
    const allDefs = ReflectValidation.getDefinitions();
    return Reflect.getMetadataKeys(trg).reduce((acc: ValidationResult[], cur) => {
      acc.push(...allDefs
        .filter(d => `${cur}`.indexOf(d.meta + ':') === 0)
        .map(def => def.fn(trg, `${cur}`.replace(def.meta + ':', ''), def.test)));
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

interface ValidationResult {
  key: string;
  value: any;
  test: string;
  valid: boolean;
  message?: string;
}