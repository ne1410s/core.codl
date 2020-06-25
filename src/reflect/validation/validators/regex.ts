import { isProvided } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates regex using string representation of the member. */
export const RegexValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const regex = new RegExp(Reflect.getMetadata(ValidationKey.REGEX, proto, key));
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => regex.test(test.toString()));

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray ? `${name} contains an invalid item` : `${name} is invalid`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
