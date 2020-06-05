import 'reflect-metadata';
import { TypedPropertyDecorator, RecordKey } from '../types';

const KEY_NAME = 'ne-codl_name';
const KEY_DESCR = 'ne-codl_description';
const KEY_FORMAT = 'ne-codl_format';

/**
 * Associates a name with the member to which it is applied.
 * @param val The name.
 */
export const name = (val: string) => Reflect.metadata(KEY_NAME, val);

/**
 * Retrieves the name metadata.
 * @param target The parent object.
 * @param key
 */
export const getName = (target: Object, key: RecordKey) => {
  return Reflect.getMetadata(KEY_NAME, target, key);
}

/**
 * Associates a description with the member to which it is applied.
 * @param val The description.
 */
export const description = (val: string) => Reflect.metadata(KEY_DESCR, val);

/**
 * Retrieves the description metadata.
 * @param target The parent object.
 * @param key
 */
export const getDescription = (target: Object, key: RecordKey) => {
  return Reflect.getMetadata(KEY_DESCR, target, key);
}

/**
 * Associates a format function with the member to which it is applied.
 * @param fn The format function.
 */
export const format = <T>(fn: (val: T) => string): TypedPropertyDecorator<T> => {
  return Reflect.metadata(KEY_FORMAT, fn);  
}

/**
 * Retrieves the formatted value.
 * @param target The parent object.
 * @param key key.
 */
export const getFormatted = (target: Object, key: RecordKey) => {
  const fn = Reflect.getMetadata(KEY_FORMAT, target, key);
  return fn((target as any)[key]);
}