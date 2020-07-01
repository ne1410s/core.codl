import 'reflect-metadata';
import { TypedPropertyDecorator } from '../types';
import { ValidationKey } from '../mdkeys';

/** Decorators for validation purposes. */
export abstract class Type {
  
  public static readonly boolean: TypedPropertyDecorator<boolean | number | string | Array<boolean | number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE_BOOLEAN}:${key.toString()}`, key, trg);
  };

  public static readonly date: TypedPropertyDecorator<Date | number | string | Array<Date | number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE_DATE}:${key.toString()}`, key, trg);
  };

  public static readonly integer: TypedPropertyDecorator<number | string | Array<number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE_INTEGER}:${key.toString()}`, key, trg);
  };

  public static readonly number: TypedPropertyDecorator<number | string | Array<number | string>> = (trg, key) => {
    Reflect.defineMetadata(`${ValidationKey.TYPE_NUMBER}:${key.toString()}`, key, trg);
  };
}
