import { Parser } from '../models';

export const DateParser: Parser<Date> = (obj) => {
  if (obj instanceof Date) return obj;
  if (typeof obj === 'string') {
    const test = new Date(obj);
    if (!isNaN(test.getTime())) return test;
  }
}