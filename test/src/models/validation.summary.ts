import { Validation, Metadata } from '../../../src/index';

export class ValidationSummaryTestModel {
  @Validation.required
  public myString: string;

  @Metadata.displayName('My Boolean')
  @Validation.required
  public myBool = false;
}
