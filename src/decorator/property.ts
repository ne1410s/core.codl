import 'reflect-metadata';

import { TypedPropertyDecorator, TypedAccessorDecorator } from './types';

const KEY_NAME = 'ne-codl_name';
const KEY_DESCR = 'ne-codl_description';
const KEY_FORMAT = 'ne-codl_format';

/**
 * Associates a name with the member to which it is applied.
 * @param val The name.
 */
export const name = (val: string) => Reflect.metadata(KEY_NAME, val);

/**
 * Associates a description with the member to which it is applied.
 * @param val The description.
 */
export const description = (val: string) => Reflect.metadata(KEY_DESCR, val);

/**
 * Associates a format with the member to which it is applied.
 * @param val The format.
 */
export const format = (val: string) => Reflect.metadata(KEY_FORMAT, val);

/**
 * Provides an initial / default value.
 * @param val The initial value.
 */
export const initial = (val: any): PropertyDecorator => {
  return (target, key) => {
    (target as any)[key] = val;
  };
};

export const booleanProp = (): TypedPropertyDecorator<boolean> => {
  return (target, key) => {
    console.log('boolean!');
  }
}

export const stringGetter = (): TypedAccessorDecorator<string> => {
  return (target, key, desc) => {
    console.log('string!', desc);
  }
} 