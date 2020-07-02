import { isProvided } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectType } from '../../type/type';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates values are within a range. */
export const RangeValidator: Validator = (trg, key, proto) => {
  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };

  if (isProvided(value)) {
    const min = Reflect.getMetadata(ValidationKey.MIN, proto, key);
    const max = Reflect.getMetadata(ValidationKey.MAX, proto, key);
    const hasMin = isProvided(min);
    const hasMax = isProvided(max);
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every((test) => (!hasMin || test >= min) && (!hasMax || test <= max));

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(proto, key);
      const fmtMin = hasMin ? ReflectMetadata.getFormatted(proto, key, min) : min;
      const fmtMax = hasMax ? ReflectMetadata.getFormatted(proto, key, max) : max;
      const isDate = ReflectType.getType(proto, key) === 'date';
      const compareLT = isDate ? 'before' : 'less than';
      const compareGT = isDate ? 'after' : 'greater than';
      const rangeImperative = isArray ? 'have all values' : 'be';
      const boundImperative = isArray ? 'have a value' : 'be';

      retVal.message =
        hasMin && hasMax
          ? `${name} must ${rangeImperative} between ${fmtMin} and ${fmtMax}`
          : hasMin
          ? `${name} cannot ${boundImperative} ${compareLT} ${fmtMin}`
          : `${name} cannot ${boundImperative} ${compareGT} ${fmtMax}`;
    }

    retVal.valid = !retVal.message;
  }

  return retVal;
};
