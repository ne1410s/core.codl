import { Validation, ReflectValidation, ValidationResult } from '../../../src/index';

export class ValidationResultTestModel {

  @Validation.required
  public myString: string;

  public testValidity(): ValidationResult {
    return ReflectValidation.validate(this);
  }
}
