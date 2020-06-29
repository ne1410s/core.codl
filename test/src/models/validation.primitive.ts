import { Validation, Metadata } from '../../../src/index';

export class ValidationPrimitiveTestModel {

  @Metadata.displayName('Nummynum')
  @Validation.primitive
  public myNumber: number;

}
