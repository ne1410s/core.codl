import { Parser } from '../models';

export const NumberParser: Parser<number> = (obj) => {
  const test = parseFloat(`${obj}`);
  if (!isNaN(test)) return test;
};
