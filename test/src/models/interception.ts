import { Interception } from '../../../src/index';

@Interception.init((x: InterceptionTestModel) => (x.prop1 = 'first this'))
export class InterceptionTestModel {
  constructor(public prop1: string) {}

  @Interception.initial(false)
  public testMe: boolean;

  @Interception.input((args) => 'fmt1')
  public format1(): string {
    return `format1: ${this.prop1}`;
  }

  @Interception.output((val, args, o: InterceptionTestModel) => {
    o.prop1 = args[0];
    return `fmt2: ${o.prop1}`;
  })
  public format2(): string {
    return `format2: ${this.prop1}`;
  }
}
