import { Metadata, Type, Validation } from '../../../src/index';

export class TypeNumberTestModel {

  @Metadata.displayName('My Num')
  @Validation.required
  @Type.number
  public myNumber: number;

  @Type.number
  public myNumbers: number[];
}
