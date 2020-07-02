import { Metadata, Type, Validation } from '../../../src/index';

export class TypeIntegerTestModel {
  @Metadata.displayName('My Int')
  @Validation.required
  @Type.integer
  public myInteger: number;

  @Type.integer
  public myIntegers: number[];
}
