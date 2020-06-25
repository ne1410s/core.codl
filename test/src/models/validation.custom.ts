import { Validation, Metadata } from '../../../src/index';

export class ValidationCustomTestModel {
  @Metadata.displayName('My String')
  @Validation.custom((val: string) => !val || val.length < 3)
  public myString = 'hello';

  @Validation.custom((val: number, trg: ValidationCustomTestModel) => {
    if (trg.myString) {
      return 'no strings allowed';
    }
  })
  public myNumber: number;
}
