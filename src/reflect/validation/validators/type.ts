import { isProvided } from '../../../types';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';
import { ReflectType } from '../../type/type';

/** Validates type. */
export const TypeValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const type = ReflectType.getType(proto, key);
    const parser = ReflectType.getParser(type);

    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => parser(test) != null);

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray
        ? `${name} contains an invalid ${type}`
        : `${name} is not a valid ${type}`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
