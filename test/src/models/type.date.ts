import { Metadata, Type, Validation } from '../../../src/index';

export class TypeDateTestModel {

  @Metadata.displayName('My Date')
  @Validation.required
  @Type.date
  public myDate: Date;

  @Type.date
  public myDates: Date[];
}
