import 'reflect-metadata';
import { TypedPropertyDecorator } from '../types';
import { ValidationKey } from '../mdkeys';

/** Decorators for type purposes. */
export abstract class Type {
  
  public static readonly boolean: TypedPropertyDecorator<boolean | number | string | Array<boolean | number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE}:${key.toString()}`, key, trg);
    Reflect.defineMetadata(ValidationKey.TYPE, 'boolean', trg, key);
  };

  public static readonly date: TypedPropertyDecorator<Date | string | Array<Date | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE}:${key.toString()}`, key, trg);
    Reflect.defineMetadata(ValidationKey.TYPE, 'date', trg, key);
  };

  public static readonly integer: TypedPropertyDecorator<number | string | Array<number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE}:${key.toString()}`, key, trg);
    Reflect.defineMetadata(ValidationKey.TYPE, 'integer', trg, key);
  };

  public static readonly number: TypedPropertyDecorator<number | string | Array<number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE}:${key.toString()}`, key, trg);
    Reflect.defineMetadata(ValidationKey.TYPE, 'number', trg, key);
  };
}
