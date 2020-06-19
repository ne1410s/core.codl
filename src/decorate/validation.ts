import 'reflect-metadata';
import { ValidationKey } from '../shared-keys';
import { TypedPropertyDecorator } from '../types';

/** Decorators for validation purposes. */
export abstract class Validation {

  /**
   * Associates a number or date property with a maximum value. 'Unprovided'
   * values (null, undefined, '') are not tested hence valid. Otherwise the
   * value must not exceed the upper bound supplied to be valid.
   * @param uBound The maximum value.
   */
  public static readonly max: <T extends Number | Date>(uBound: T) => TypedPropertyDecorator<T> = (uBound) => {
    return (trg, key) => {
      Reflect.defineMetadata(`${ValidationKey.MAX}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(ValidationKey.MAX, uBound, trg, key);
    };
  }

  /**
   * Associates a string property with a maximum length. 'Unprovided' values
   * (null, undefined) are not tested hence valid - except empty strings.
   * Otherwise the string length must not exceed the upper bound supplied.
   * @param uBound The maximum length.
   */
  public static readonly maxLength: (uBound: number) => TypedPropertyDecorator<String> = (uBound) => {
    return (trg, key) => {
      Reflect.defineMetadata(`${ValidationKey.MAX}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(ValidationKey.MAX, uBound, trg, key);
    };
  }

  /**
   * Associates a property with a minimum value. 'Unprovided' values (null,
   * undefined, '') are not tested hence valid. Otherwise the value must not be
   * less than the lower bound supplied to be valid.
   * @param lBound The minimum value.
   */
  public static readonly min: <T extends Number | Date>(lBound: T) => TypedPropertyDecorator<T> = (lBound) => {
    return (trg, key) => {
      Reflect.defineMetadata(`${ValidationKey.MIN}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(ValidationKey.MIN, lBound, trg, key);
    };
  }

  /**
   * Associates a string property with a minimum length. 'Unprovided' values
   * (null, undefined) are not tested hence valid - except empty strings.
   * Otherwise the string length must not be less than the bound supplied.
   * @param lBound The minimum length.
   */
  public static readonly minLength: (lBound: number) => TypedPropertyDecorator<String> = (lBound) => {
    return (trg, key) => {
      Reflect.defineMetadata(`${ValidationKey.MIN}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(ValidationKey.MIN, lBound, trg, key);
    };
  }

  /**
   * Associates a property with minimum and maximum values. 'Unprovided' values
   * (null, undefined, '') are not tested hence valid. Otherwise the value must
   * be (inclusively) between the lower and upper bounds.
   * @param lBound The minimum value.
   */
  public static readonly range: <T extends Number | Date>(lBound: T, uBound: T) => TypedPropertyDecorator<T> = (lBound, uBound) => {
    return (trg, key) => {
      Reflect.defineMetadata(`${ValidationKey.MIN}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(`${ValidationKey.MAX}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(ValidationKey.MIN, lBound, trg, key);
      Reflect.defineMetadata(ValidationKey.MAX, uBound, trg, key);
    };
  }

  /**
   * Associates a property with a pattern. 'Unprovided' values (null, undefined,
   * '') are not tested hence valid. Otherwise the string representation of the
   * value must match the regex supplied to be valid.
   * @param regex The validation pattern.
   */
  public static readonly regex: (regex: string | RegExp) => PropertyDecorator = (regex) => {
    return (trg, key) => {
      Reflect.defineMetadata(`${ValidationKey.REGEX}:${key.toString()}`, key, trg);
      Reflect.defineMetadata(ValidationKey.REGEX, regex, trg, key);
    };
  };

  /**
   * Makes a property required. 'Unprovided' values (null, undefined, '') are
   * invalid, as is NaN. Anything else is valid (including: 0, 0n, false).
   */
  public static readonly required: PropertyDecorator = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.REQUIRED}:${key.toString()}`, key, trg);
    Reflect.defineMetadata(ValidationKey.REQUIRED, true, trg, key);
  };
}