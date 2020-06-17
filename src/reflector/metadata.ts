import 'reflect-metadata';
import { MetadataKeys } from "../shared-keys";
import { RecordKey } from "../types";

export abstract class ReflectMetadata {

  /**
   * Retrieves the display name if provided (else the property key).
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly getDisplayName = (target: Object, key: RecordKey) => {
    return Reflect.getMetadata(MetadataKeys.DISPLAY_NAME, target, key);
  }

  /**
   * Retrieves the description.
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly getDescription = (target: Object, key: RecordKey) => {
    return Reflect.getMetadata(MetadataKeys.DESCRIPTION, target, key);
  }

  /**
   * Retrieves the formatted value if format provided (else the raw value).
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly getFormatted = (target: Object, key: RecordKey) => {
    const fn = Reflect.getMetadata(MetadataKeys.FORMAT, target, key);
    const value = (target as any)[key];
    return fn ? fn(value) : value;
  }
}