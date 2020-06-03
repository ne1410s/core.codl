import { TypedArgumentDecorator, ArgumentDecorator } from './types';

export const stringArg = (): TypedArgumentDecorator<string> => {
  return (target, key, idx) => {
    console.log('string!', idx);
  }
}

export const anyArg: ArgumentDecorator = (target, key, idx) => {
  console.log('wtf any wtf');
}