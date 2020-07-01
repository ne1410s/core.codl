import { Metadata, Type, Validation } from '../../../src/index';

export class TypeBooleanTestModel {

  @Metadata.displayName('My Bool')
  @Validation.required
  @Type.boolean
  public myBoolean: boolean;

  @Type.boolean
  public myBooleans: boolean[];
}
