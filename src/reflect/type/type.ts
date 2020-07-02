import 'reflect-metadata';
import { RecordKey, isProvided } from '../../types';
import { ValidationKey } from '../../mdkeys';
import { Parser } from './models';
import { BooleanParser } from './parsers/boolean';
import { DateParser } from './parsers/date';
import { IntegerParser } from './parsers/integer';
import { NumberParser } from './parsers/number';

export abstract class ReflectType {
  /**
   * Parses provided according to its meta type. If no type found, the original
   * value is returned, otherwise a value is only returned in parseable cases.
   * @param target The object.
   * @param key The property key.
   * @param value Optional value override to parse instead.
   */
  public static parse(target: Object, key: RecordKey, value?: any): any {
    value = value == undefined ? (target as any)[key] : value;
    if (isProvided(value)) {
      const type = this.getType(target, key);
      return type ? this.getParser(type)(value) : value;
    }
  }

  /** Gets the meta type of that identified by the supplied parameters. */
  public static getType(target: Object, key: RecordKey): string {
    return Reflect.getMetadata(ValidationKey.TYPE, target, key);
  }

  /** Gets parser for supported meta types. */
  public static getParser(type: string): Parser<any> {
    switch (type) {
      case 'boolean':
        return BooleanParser;
      case 'date':
        return DateParser;
      case 'integer':
        return IntegerParser;
      case 'number':
        return NumberParser;
      default:
        throw new RangeError(`No parser implemented for ${type}`);
    }
  }
}
