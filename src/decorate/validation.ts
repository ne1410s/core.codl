import 'reflect-metadata';
import { ValidationKey } from '../shared-keys';

/** Decorators for validation purposes. */
export abstract class Validation {

  /**
   * Associates mandatoryness with the member to which it is applied.
   * Null-like values and empty strings are deemed invalid.
   * @param trg The target object.
   * @param key The property key.
   */
  public static readonly required: PropertyDecorator = (trg, key) => {
    
    // Register property decoration on the object (to assist with reflection)
    Reflect.defineMetadata(`${ValidationKey.REQUIRED}:${key.toString()}`, key, trg);

    // Define the decoration on the property
    Reflect.defineMetadata(ValidationKey.REQUIRED, true, trg, key);
  }
}