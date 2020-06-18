import { Custom } from '../decorators/custom';

export class CustomTestModel {

  @Custom.stringGetter()
  public get testString(): string {
    return 'bonjour';
  }

  @Custom.booleanProp
  public get testBool(): boolean {
    return true;
  }

  @Custom.booleanProp
  public testMe: boolean;

  public testFn(

      @Custom.stringArg('something dynamic')
      param1: string,
      
      @Custom.anyArg
      param2: Date): boolean {
    
    return false;
  }
}
