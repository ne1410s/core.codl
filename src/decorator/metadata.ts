import 'reflect-metadata';
import { TypedPropertyDecorator, RecordKey } from '../types';

const KEY_NAME = 'ne-codl_name';
const KEY_DESCR = 'ne-codl_description';
const KEY_FORMAT = 'ne-codl_format';
const KEY_FMT = 'ne-codl_fmt';

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
 * Associates a bullshit format with the member to which it is applied.
 * @param val The format.
 */
export const format = (val: string) => Reflect.metadata(KEY_FORMAT, val);

/**
 * Retrieves the name metadata.
 * @param target The parent object.
 * @param key
 */
export const getName = (target: Object, key: RecordKey) => {
  return Reflect.getMetadata(KEY_NAME, target, key);
}

/**
 * Associates a cool format with the member to which it is applied.
 * @param fn The formatter function.
 */
export const fmt = <T>(fn: (val: T) => string): TypedPropertyDecorator<T> => {
  return (target, key) => {
    const trg = target as any;

    //hmm this is not dynamic
    // need to programatically define a getter...
    
    trg[`__get_${key}`] = () => fn(trg[key]);
  };
}
