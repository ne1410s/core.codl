import { Validation, Metadata } from '../../../src/index';

export class ValidationRangeTestModel {
  @Metadata.format((v: Date) => `${v.getDate()}/${v.getMonth() + 1}/${v.getFullYear()}`)
  @Validation.min(new Date(2000, 1, 1))
  public myDate: Date = new Date(2002, 2, 14);

  @Metadata.displayName('Price')
  @Metadata.format((v: number) => `£${v.toFixed(2)}`)
  @Validation.range(20, 50)
  public myNumber: number = 3;

  @Validation.max(2)
  public myNumberMax2 = 2;

  @Validation.min(3)
  public myNumberMin3 = 3;

  @Validation.minLength(1)
  public myString = '';

  @Validation.minLength(3)
  public myStrArr: string[];
}
