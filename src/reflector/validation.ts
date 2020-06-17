import 'reflect-metadata';
import { ValidationKeys } from "../shared-keys";
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
    const required = Reflect.getMetadata(ValidationKeys.REQUIRED, target, key) === true;
    const present = value !== null && value !== undefined && value !== NaN && value !== '';

    return present || !required;
  }

  public static validate(target: Object): ValidationResult {

    console.log('K3YZ:', Reflect.getMetadata('design:type', Object));

    return null;
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