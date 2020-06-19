import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut, isProvided } from "../model";

/** Validates values are within a range. */
export const RangeValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };

  if (isProvided(value) || value === '') {

    const min = Reflect.getMetadata(ValidationKey.MIN, trg, key);
    const max = Reflect.getMetadata(ValidationKey.MAX, trg, key);
    const hasMin = isProvided(min);
    const hasMax = isProvided(max);

    const isString = typeof value === 'string';
    const test = isString ? value.length : value;
    const minOk = !hasMin || test >= min;
    const maxOk = !hasMax || test <= max;
    
    if (!minOk || !maxOk) {
      const name = ReflectMetadata.getDisplayName(trg, key);
      const fmtMin = hasMin && !isString ? ReflectMetadata.getFormatted(trg, key, min) : min;
      const fmtMax = hasMax && !isString ? ReflectMetadata.getFormatted(trg, key, max) : max;
      retVal.message = hasMin && hasMax 
        ? `${name} must be between ${fmtMin} and ${fmtMax}`
          : hasMin 
            ? `${name} cannot be less than ${fmtMin}`
            : `${name} cannot exceed ${fmtMax}`;

      if (isString) retVal.message += ' characters';
    }
    
    retVal.valid = !retVal.message;
  }
  
  return retVal;
}