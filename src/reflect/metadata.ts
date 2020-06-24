import 'reflect-metadata';
import { MetadataKey } from '../mdkeys';
import { RecordKey } from '../types';

export abstract class ReflectMetadata {

  /**
   * Retrieves the display name if provided (else the property key).
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly getDisplayName = (target: Object, key: RecordKey): string => {
    return Reflect.getMetadata(MetadataKey.DISPLAY_NAME, target, key) || key;
  }

  /**
   * Retrieves the description.
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly getDescription = (target: Object, key: RecordKey): string => {
    return Reflect.getMetadata(MetadataKey.DESCRIPTION, target, key);
  }

  /**
   * Retrieves the formatted value if format provided (else the raw value).
   * @param target The parent object.
   * @param key The property key.
   * @param other If supplied, the formatter is applied to this value, rather
   * than that of the property.
   */
  public static readonly getFormatted = (target: Object, key: RecordKey, other?: unknown): string => {
    const fn = Reflect.getMetadata(MetadataKey.FORMAT, target, key);
    const value = other != null ? other : (target as any)[key];
    return fn ? fn(value) : value;
  }

  /**
   * Retrieves type information for the specified member, by instantiating a new
   * instance from metadata. If no such metadata found, returns a blank object.
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly getPrototype = <T>(target: T, key: RecordKey): T => {
    const type = Reflect.getMetadata(MetadataKey.TYPE, target, key);
    return type ? new type() : {};
  }
}