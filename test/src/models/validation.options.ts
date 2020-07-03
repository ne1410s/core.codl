import { Validation } from '../../../src/index';

enum Day {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

enum Licence {
  UKF = 'UK Full',
  UKP = 'UK Provisional',
  EU = 'European',
}

const enum RGB {
  Red,
  Green,
  Blue,
}

export class ValidationOptionsTestModel {
  @Validation.options('item1', 'item33')
  public myString: string;

  @Validation.options(true, undefined)
  public myBooleans: boolean[];

  @Validation.required
  @Validation.options(Day.Mon, Day.Sat, Day.Sun, 4)
  public day: Day;

  @Validation.options('European', Licence.UKF)
  public licences: Licence[];

  @Validation.options(1)
  public color: RGB;
}
