import { isProvided } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates boolean values. */
export const BooleanValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    retVal.message = 'todo';
  }

  retVal.valid = !retVal.message;
  return retVal;
};
