import { isProvided } from '../../../types';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates date values. */
export const DateValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => test instanceof Date || new Date(test));

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray ? `${name} contains an invalid date` : `${name} is an invalid date`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
