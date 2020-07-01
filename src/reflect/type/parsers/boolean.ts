import { Parser } from '../models';

export const BooleanParser: Parser<boolean> = (obj) => {
  const str = `${obj}`.toLowerCase();
  if (['1', 'true'].indexOf(str) !== -1) return true;
  if (['0', 'false'].indexOf(str) !== -1) return false;
}