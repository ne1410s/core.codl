import { Validation } from '../../../src/index';

export class ValidationSummaryTestModel {

  @Validation.required
  public myString: string;
}
