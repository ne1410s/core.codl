import { Instantiable } from './types';

/** Exposes newly-constructed instances. */
export const expose = <T>(ctor: Instantiable<T>, cb: (item: T) => void): Instantiable<T> => {
  
  const retVal = (...args: any[]) => {    
    const maker: any = function() { return ctor.apply(this, args); }
    maker.prototype = ctor.prototype;
    const instance = new maker() as T;
    cb(instance);
    return instance;
  }

  retVal.prototype = ctor.prototype;
  return retVal as unknown as Instantiable<T>;
}

/** Provides access to new instances on construction. */
export const created = <T>(cb: (o: any) => void) => (c: Instantiable<T>) => expose(c, cb);