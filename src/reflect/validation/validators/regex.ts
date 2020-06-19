import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut } from "../model";

/** Validates regex using string representation of the member. */
export const RegexValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const provided = value !== null && value !== undefined && value !== NaN && value !== '';
  const retVal: ValidatorOut = { value, valid: true };

  if (provided) {

    const regex = new RegExp(Reflect.getMetadata(ValidationKey.REGEX, trg, key));
    const isMatch = regex.test(value);
    if (!isMatch) {

      const name = ReflectMetadata.getDisplayName(trg, key);
      retVal.message = `${name} is invalid`;
      retVal.valid = false;
    }
  }
  
  return retVal;
}