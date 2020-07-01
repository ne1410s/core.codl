import { isProvided } from '../../../types';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates number values. */
export const NumberValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => !isNaN(parseFloat(`${test}`)));

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray ? `${name} contains an invalid number` : `${name} is an invalid number`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
