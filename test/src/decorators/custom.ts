import { TypedArgumentDecorator, TypedPropertyDecorator, TypedAccessorDecorator } from '../../../src';

/** Custom decorators. */
export abstract class Custom {

  /**
   * Parameter decorator.
   */
  public static readonly anyArg: ParameterDecorator = (target, key, idx) => {
    console.log('wtf any wtf');
  }
  
  /**
   * Argument decorator.
   * (An example of the factory pattern: where a decorator is returned).
   */
  public static readonly stringArg = (dyn: string): TypedArgumentDecorator<string> => {
    return (target, key, idx) => {
      console.log('string!', idx, 'dyn:', dyn);
    }
  }
  
  /** 
   * Property decorators may also be used on accessors - but does not expose the
   * property descriptor in either case.
   * (An example of the definitive pattern: where a decorator is defined).
   */
  public static readonly booleanProp: TypedPropertyDecorator<boolean> = (target, key) => {
    console.log('boolean!');
  }
  
  /**
   * Access decorators expose the property descriptor, but as such cannot be used
   * on field-type properties (i.e. with no accessor).
   */
  public static readonly stringGetter = (): TypedAccessorDecorator<string> => {
    return (target, key, desc) => {
      console.log('string!', desc);
    }
  }
}