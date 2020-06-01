import { init, input, output } from '../../src/index';

@init((x: TestClass1) => x.prop1 = 'first this')
export class TestClass1 {
  constructor(public prop1: string) { }

  @input(args => 'fmt1')
  public format1(): string {
    return `format1: ${this.prop1}`;
  }

  @output((val, args, o: TestClass1) => {
    o.prop1 = args[0];
    return `fmt2: ${o.prop1}`;
  })
  public format2(): string {
    return `format2: ${this.prop1}`;
  }
}
