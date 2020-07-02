import { Validation } from '../../../src/index';

export class ValidationOptionsTestModel {
  
  @Validation.options('item1', 'item33')
  public myString: string;

  @Validation.options(undefined, true)
  public myBooleans: boolean[];
}
