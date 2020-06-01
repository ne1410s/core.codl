import { FunctionDecorator } from './types';

/**
 * Intercepts the input of a function, preventing its execution.
 * @param fn A custom function.
 * @returns The result of the custom function.
 */
export const input = (fn: (args: any[], o: any) => any): FunctionDecorator => {
  return (trg, key, desc) => {
    desc.value = (...args: any[]) => fn(args, trg);
  }
}

/**
 * Intercepts the output of a function, after it is executed.
 * @param fn A custom function.
 * @returns The result of the custom function.
 */
export const output = <T>(fn: (val: T, args: any[], o: any) => T): FunctionDecorator => { 
  return (trg, key, desc) => {
    const origFn = desc.value;
    desc.value = (...args: any[]) => {
      const origVal = origFn.apply(trg, args);
      return fn(origVal, args, trg);
    };
  }
}