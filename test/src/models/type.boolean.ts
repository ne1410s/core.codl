import { Metadata, Type, Validation } from '../../../src/index';

export class ValidationBooleanTestModel {

  @Metadata.displayName('My Num')
  @Validation.required
  @Type.boolean
  public myNumber: boolean;

  @Type.boolean
  public myVals: string[];
}
