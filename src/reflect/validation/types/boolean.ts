import { isProvided } from '../../../types';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates boolean values. */
export const BooleanValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const regex = /^(0|1|false|true)$/i;
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => regex.test(`${test}`));

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray ? `${name} contains an invalid boolean` : `${name} is an invalid boolean`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
