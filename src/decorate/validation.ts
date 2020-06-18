import 'reflect-metadata';
import { ValidationKey } from '../shared-keys';

/** Decorators for validation purposes. */
export abstract class Validation {

  /**
   * Associates mandatoryness with the member to which it is applied. Anything
   * truthy shall be considered VALID (as are 0, 0n and false). Null, undefined,
   * NaN and empty strings shall be considered INVALID in this test.
   * @param trg The target object.
   * @param key The property key.
   */
  public static readonly required: PropertyDecorator = (trg, key) => {
    
    // Register property decoration on the object (to assist with reflection)
    Reflect.defineMetadata(`${ValidationKey.REQUIRED}:${key.toString()}`, key, trg);

    // Define the decoration on the property
    Reflect.defineMetadata(ValidationKey.REQUIRED, true, trg, key);
  }

  /**
   * Associates a regular expression with the member to which it is applied.
   * Null and undefined values are deemed missing and hence shall be considered
   * VALID in this test. Otherwise, the string representation of the value shall
   * be tested against the regex supplied. 
   * @param regex 
   */
  public static readonly regex: (regex: string | RegExp) => PropertyDecorator = (regex) => {

    return (trg, key) => {

      // Register property decoration on the object (to assist with reflection)
      Reflect.defineMetadata(`${ValidationKey.REGEX}:${key.toString()}`, key, trg);

      // Define the decoration on the property
      Reflect.defineMetadata(ValidationKey.REGEX, regex, trg, key);
    };
  }
}