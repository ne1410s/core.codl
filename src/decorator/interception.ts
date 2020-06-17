import { Ctor, FunctionDecorator, TypedPropertyDecorator } from '../types';

export abstract class Interception {
  
  /**
   * Calls a custom function each with new instance created.
   * @param fn A custom function.
   */
  public static readonly init = <T>(fn: (o: any) => void) => (c: Ctor<T>) => Interception.expose(c, fn);
  
  /**
   * Provides an initial / default value.
   * @param val The initial value.
   */
  public static readonly initial = <T>(val: T): TypedPropertyDecorator<T> => {
    return (target, key) => {
      (target as any)[key] = val;
    };
  };
  
  /**
   * Intercepts the input of a function, preventing its execution.
   * @param fn A custom function.
   * @returns The result of the custom function.
   */
  public static readonly input = (fn: (args: any[], o: any) => any): FunctionDecorator => {
    return (trg, key, desc) => {
      desc.value = (...args: any[]) => fn(args, trg);
    };
  };
  
  /**
   * Intercepts the output of a function, after it is executed.
   * @param fn A custom function.
   * @returns The result of the custom function.
   */
  public static readonly output = <T>(fn: (val: T, args: any[], o: any) => T): FunctionDecorator => {
    return (trg, key, desc) => {
      const origFn = desc.value;
      desc.value = (...args: any[]) => {
        const origVal = origFn.apply(trg, args);
        return fn(origVal, args, trg);
      };
    };
  };

  private static readonly expose = <T>(ctor: Ctor<T>, fn: (o: T) => void): Ctor<T> => {
    const retVal = (...args: any[]) => {
      const maker: any = function () { return ctor.apply(this, args); }
      maker.prototype = ctor.prototype;
      const instance = new maker() as T;
      fn(instance);
      return instance;
    };
  
    retVal.prototype = ctor.prototype;
    return retVal as unknown as Ctor<T>;
  };
}