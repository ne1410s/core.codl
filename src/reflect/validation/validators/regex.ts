import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut, isProvided } from "../model";

/** Validates regex using string representation of the member. */
export const RegexValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };
  
  if (isProvided(value)) {

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