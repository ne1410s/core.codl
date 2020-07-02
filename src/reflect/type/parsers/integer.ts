import { Parser } from '../models';

export const IntegerParser: Parser<number> = (obj) => {
  const asInt = parseInt(`${obj}`, 10);
  if (!isNaN(asInt) && asInt.toFixed(8) === parseFloat(`${obj}`).toFixed(8)) return asInt;
};
