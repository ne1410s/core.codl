import { isProvided, Primitive } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates primitive types. */
export const PrimitiveValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (!isProvided(value) || value === NaN) {
    const type = Reflect.getMetadata(ValidationKey.PRIMITIVE, proto, key) as Primitive;
    if (true) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = `${name} is not a valid ${type}`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
