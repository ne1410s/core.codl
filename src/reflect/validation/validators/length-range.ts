import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut, isProvided } from "../model";

/** Validates string / array length are within specified range. */
export const LengthRangeValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };

  if (isProvided(value)) {

    const minLength = Reflect.getMetadata(ValidationKey.MIN_LENGTH, trg, key);
    const maxLength = Reflect.getMetadata(ValidationKey.MAX_LENGTH, trg, key);
    const hasMinLen = isProvided(minLength);
    const hasMaxLen = isProvided(maxLength);

    const minOk = !hasMinLen || value.length >= minLength;
    const maxOk = !hasMaxLen || value.length <= maxLength;
    
    if (!minOk || !maxOk) {
      const name = ReflectMetadata.getDisplayName(trg, key);
      const noun = typeof value === 'string' ? 'character' : 'item';
      const pluraliser = value.length === 1 ? '' : 's';
      retVal.message = hasMinLen && hasMaxLen
        ? `${name} must contain between ${minLength} and ${maxLength} ${noun}s`
          : hasMinLen
            ? `${name} cannot contain fewer than ${minLength} ${noun}${pluraliser}`
            : `${name} cannot contain more than ${maxLength} ${noun}${pluraliser}`;
    }
    
    retVal.valid = !retVal.message;
  }
  
  return retVal;
}