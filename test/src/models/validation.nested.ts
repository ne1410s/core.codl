import { Validation, Metadata } from '../../../src/index';

export class ValidationNestedTestModel {

  @Validation.minLength(1)
  public myArr: ValidationNestedSubModel[];
}

export class ValidationNestedSubModel {

  @Metadata.displayName('Nested String')
  @Validation.required
  public myString: string;
}
