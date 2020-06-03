import { 
  ArgumentDecorator,
  TypedArgumentDecorator,
  TypedPropertyDecorator,
  TypedAccessorDecorator } from '../../src';

export const anyArg: ArgumentDecorator = (target, key, idx) => {
  console.log('wtf any wtf');
}

/**
 * Argument decorator.
 * (An example of the factory pattern: where a decorator is returned).
 */
export const stringArg = (dyn: string): TypedArgumentDecorator<string> => {
  return (target, key, idx) => {
    console.log('string!', idx, 'dyn:', dyn);
  }
}

/** 
 * Property decorators may also be used on accessors - but does not expose the
 * property descriptor in either case.
 * (An example of the definitive pattern: where a decorator is defined).
 */
export const booleanProp: TypedPropertyDecorator<boolean> = (target, key) => {
  console.log('boolean!');
}

/**
 * Access decorators expose the property descriptor, but as such cannot be used
 * on field-type properties (i.e. with no accessor).
 */
export const stringGetter = (): TypedAccessorDecorator<string> => {
  return (target, key, desc) => {
    console.log('string!', desc);
  }
}