import { init, input, output } from '../../src/index';

@init((c: TestDeclarations) => c.initStr = 'boo')
export class TestDeclarations {
  constructor(public initStr: string) { }

  @input(args => args.length + ' arg(s)')
  public testFuncInput(newStr: string): string {
    return 'hey, ' + (newStr || this.initStr);
  }

  @output((val, args) => 'YO: ' + val)
  public testFuncOutput(newStr: string): string {
    return 'hey, ' + (newStr || this.initStr);
  }
}
