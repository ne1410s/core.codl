import { Instantiable } from './types';

/** Exposes newly-constructed instances. */
export const expose = <T>(ctor: Instantiable<T>, fn: (o: T) => void): Instantiable<T> => {
  
  const retVal = (...args: any[]) => {    
    const maker: any = function() { return ctor.apply(this, args); }
    maker.prototype = ctor.prototype;
    const instance = new maker() as T;
    fn(instance);
    return instance;
  }

  retVal.prototype = ctor.prototype;
  return retVal as unknown as Instantiable<T>;
}

/**
 * Calls a custom function each with new instance created.
 * @param fn A custom function.
 */
export const init = <T>(fn: (o: any) => void) => (c: Instantiable<T>) => expose(c, fn);
