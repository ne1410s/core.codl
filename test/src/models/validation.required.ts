import { Validation, ReflectValidation } from '../../../src/index';

export class ValidationRequiredTestModel {

  @Validation.required
  public get myNullAccessor(): number { return null; }

  @Validation.required
  public get myPresentAccessor(): number { return 33; }

  @Validation.required
  public myString = '';

  @Validation.required
  public myNumber: number;

  @Validation.required
  public myOptionalBool?: boolean;

  @Validation.required
  public myBool: boolean;

  @Validation.required
  public myOtherString = ' ';

  public myUndecorated: string;

  public testValidity(key: string): boolean {
    return ReflectValidation.isValid_Required(this, key);
  }
}
