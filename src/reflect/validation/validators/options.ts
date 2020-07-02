import { isProvided } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates the member value is contained within predefined options. */
export const OptionsValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const options: any[] = Reflect.getMetadata(ValidationKey.OPTIONS, proto, key);
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => options.indexOf(test) !== -1);

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      retVal.message = isArray
        ? `${name} contains an invalid option`
        : `${name} is an invalid option`;
    }
  }

  retVal.valid = !retVal.message;
  return retVal;
};
