import 'reflect-metadata';
import { ValidationKeys } from '../shared-keys';
import { Metadata } from './metadata';

/** Decorators for validation purposes. */
export abstract class Validation {

  /**
   * Associates mandatoryness with the member to which it is applied.
   * Null-like values and empty strings are deemed invalid.
   * @param trg The target object.
   * @param key The property key.
   */
  public static readonly required: PropertyDecorator = (trg, key) => {

    //TODO: Set metadata listing on Object (trg) so that we can grab undefined properties generically later...

    return Reflect.metadata(ValidationKeys.REQUIRED, true);
  }

}