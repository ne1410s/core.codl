import { FunctionDecorator } from './types';

/** Intercepts input and returns a different value. */
export const input = (fn: (args: any[], that: any) => any): FunctionDecorator => {
  return (trg, key, desc) => {
    desc.value = (...args: any[]) => fn(args, trg);
  }
}

/** Intercepts output and returns a different value. */
export const output = <T>(fn: (val: T, args: any[], that: any) => T): FunctionDecorator => { 
  return (trg, key, desc) => {
    const origFn = desc.value;
    desc.value = (...args: any[]) => {
      const origVal = origFn.apply(trg, args);
      return fn(origVal, args, trg);
    };
  }
}