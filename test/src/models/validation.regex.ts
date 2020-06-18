import { Validation, Metadata } from '../../../src/index';

export class ValidationRegexTestModel {

  @Validation.regex(/\d+/)
  public myString = 'hello';

  @Metadata.displayName('My Number')
  @Validation.required
  @Validation.regex('[5-9]')
  public myNumber: number;
}
