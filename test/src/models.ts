import { Interception, Metadata, ReflectMetadata } from '../../src/index';
import { stringGetter, booleanProp, stringArg, anyArg } from './decorators';

@Interception.init((x: TestClass1) => x.prop1 = 'first this')
export class TestClass1 {

  @stringGetter()
  public get testString(): string {
    return 'bonjour';
  }

  @booleanProp
  public get testBool(): boolean {
    return true;
  }

  private _price: number = 12.4534;

  @Metadata.format((x: number) => `£${x.toFixed(2)}`)
  public get price() { return this._price; }
  public set price(value: number) { this._price = value; }

  public get priceFormatted() { return ReflectMetadata.getFormatted(this, 'price'); }

  constructor(
    public prop1: string) 
  {}

  @booleanProp
  @Interception.initial(false)
  public testMe: boolean;

  @Metadata.displayName('bar')
  public testMeToo: string = 'foo';
  public get getTestMeTooName(): string {
    return ReflectMetadata.getDisplayName(this, 'testMeToo');
  }

  @Interception.input(args => 'fmt1')
  public format1(): string {
    return `format1: ${this.prop1}`;
  }

  @Interception.output((val, args, o: TestClass1) => {
    o.prop1 = args[0];
    return `fmt2: ${o.prop1}`;
  })
  public format2(): string {
    return `format2: ${this.prop1}`;
  }

  public testFn(

      @stringArg('something dynamic')
      param1: string,
      
      @anyArg
      param2: Date): boolean {
    
    return false;
  }
}
