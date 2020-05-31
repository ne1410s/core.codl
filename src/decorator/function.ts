import { FunctionDecorator } from './types';

export const subvert = <T>(value: T): FunctionDecorator => {
  
  // can we obtain the initial return value?
  // hmm. yes.. but only if we can get at the params
  return (trg, key, desc) => {
    desc.value = () => value;
    return desc;
  }
}