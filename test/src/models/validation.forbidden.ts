import { Validation } from '../../../src/index';

export class ValidationForbiddenTestModel {
  @Validation.forbidden
  public myString: string;

  @Validation.forbidden
  public myBool: boolean;
}
