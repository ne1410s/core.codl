import { init, input, output, initial, booleanProp, stringGetter, stringArg, anyArg } from '../../src/index';

@init((x: TestClass1) => x.prop1 = 'first this')
export class TestClass1 {

  @stringGetter()
  public get testString(): string {
    return 'bonjour';
  }

  @booleanProp()
  public get testBool(): boolean {
    return true;
  }

  constructor(
    public prop1: string) 
  {}

  @booleanProp()
  @initial(true)
  public testMe: boolean;

  public testMeToo: string;

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

  public testFn(

      @stringArg()
      param1: string,
      
      @anyArg
      param2: Date): boolean {
    
    return false;
  }
}
