import { isProvided } from '../../../types';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates integer values. */
export const IntegerValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => {
      const asInt = parseInt(`${test}`, 10);
      return !isNaN(asInt) && asInt.toFixed(8) === parseFloat(`${test}`).toFixed(8);
    });

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray ? `${name} contains an invalid integer` : `${name} is an invalid integer`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
