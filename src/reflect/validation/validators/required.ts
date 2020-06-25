import { isProvided } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates required items. 0, 0n and false are allowed */
export const RequiredValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (!isProvided(value) || value === NaN) {
    const required = Reflect.getMetadata(ValidationKey.REQUIRED, proto, key) === true;
    if (required) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = `${name} is required`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
