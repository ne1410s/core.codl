import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut, isProvided } from "../model";

/** Validates values are within a range. */
export const RangeValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };

  if (isProvided(value)) {

    const min = Reflect.getMetadata(ValidationKey.MIN, trg, key);
    const max = Reflect.getMetadata(ValidationKey.MAX, trg, key);
    const hasMin = isProvided(min);
    const hasMax = isProvided(max);
    const isArray = Array.isArray(value);
    const tests: any[] = isArray ? value : [value];
    const allOk = tests.every(test => (!hasMin || test >= min) && (!hasMax || test <= max));

    if (!allOk) {
      const name = ReflectMetadata.getDisplayName(trg, key);
      const fmtMin = hasMin ? ReflectMetadata.getFormatted(trg, key, min) : min;
      const fmtMax = hasMax ? ReflectMetadata.getFormatted(trg, key, max) : max;
      const isDate = tests[0] instanceof Date;
      const compareLT = isDate ? 'before' : 'less than';
      const compareGT = isDate ? 'after' : 'greater than';
      const rangeImperative = isArray ? 'have all values' : 'be';
      const boundImperative = isArray ? 'have a value' : 'be';

      retVal.message = hasMin && hasMax 
        ? `${name} must ${rangeImperative} between ${fmtMin} and ${fmtMax}`
          : hasMin 
            ? `${name} cannot ${boundImperative} ${compareLT} ${fmtMin}`
            : `${name} cannot ${boundImperative} ${compareGT} ${fmtMax}`;
    }
    
    retVal.valid = !retVal.message;
  }
  
  return retVal;
}