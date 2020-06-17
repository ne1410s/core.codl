import 'reflect-metadata';
import { ValidationKey } from "../shared-keys";
import { RecordKey } from "../types";

/** Reflects and processes validation decorations. */
export abstract class ReflectValidation {

  // TODO: Eventually only expose the useful endpoints as public

  /**
   * Retrieves the required validity status. 0, 0n and false are considered as
   * being present; whereas null, undefined, NaN and empty strings are not.
   * @param target The parent object.
   * @param key The property key.
   */
  public static isValid_Required(target: Object, key: RecordKey): boolean {

    const value = (target as any)[key];
    const required = Reflect.getMetadata(ValidationKey.REQUIRED, target, key) === true;
    const present = value !== null && value !== undefined && value !== NaN && value !== '';

    return present || !required;
  }

  public static validate(target: Object): ValidationResult {

    const reqErrors = ReflectValidation.getProps(target, ValidationKey.REQUIRED)
      .filter(key => !this.isValid_Required(target, key))
      .map(key => ({ 
        message: `${key} is required`, 
        value: (target as any)[key], 
        key } as ValidationError))
    
    // TODO: Other validation criteria here

    return {
      valid: reqErrors.length == 0,
      errors: reqErrors
    }
  }

  /** Lists all members registered with the metakey provided. */
  private static getProps(trg: Object, metakey: ValidationKey): string[] {
    return Reflect.getMetadataKeys(trg)
        .filter(mdk => String(mdk).indexOf(metakey + ':') === 0)
        .map(mdk => String(mdk).replace(metakey + ':', ''))
  }
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  key: string;
  value: any;
  message: string;
}