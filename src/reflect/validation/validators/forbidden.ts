import { isProvided } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates forbidden items. Only null, undefined and empty strings are ok. */
export const ForbiddenValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const forbidden = Reflect.getMetadata(ValidationKey.FORBIDDEN, proto, key) === true;
    if (forbidden) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = `${name} is forbidden`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
