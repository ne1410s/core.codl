import 'reflect-metadata';
import { TypedPropertyDecorator } from '../types';
import { MetadataKeys } from '../shared-keys';

/** Decorators for metadata purposes. */
export abstract class Metadata {

  /**
   * Associates a display name with the member to which it is applied.
   * @param val The name.
   */
  public static readonly displayName = (val: string) => {
    return Reflect.metadata(MetadataKeys.DISPLAY_NAME, val);
  }

  /**
   * Associates a description with the member to which it is applied.
   * @param val The description.
   */
  public static readonly description = (val: string) => {
    return Reflect.metadata(MetadataKeys.DESCRIPTION, val);
  }

  /**
   * Associates a format function with the member to which it is applied.
   * @param fn The format function.
   */
  public static readonly format = <T>(fn: (val: T) => string): TypedPropertyDecorator<T> => {
    return Reflect.metadata(MetadataKeys.FORMAT, fn);  
  }
}