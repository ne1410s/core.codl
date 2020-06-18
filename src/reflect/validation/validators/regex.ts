import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut } from "../model";

/** Validates regex using string representation of the member. */
export const RegexValidator: Validator = (trg, key) => {
  const value = (trg as any)[key];
  const regex = new RegExp(Reflect.getMetadata(ValidationKey.REGEX, trg, key));
  const valid = value === null || value === undefined || regex.test(value);
  const retVal: ValidatorOut = { value, valid };
  if (!retVal.valid) {
    const name = ReflectMetadata.getDisplayName(trg, key);
    retVal.message = `${name} is invalid`;
  }
  
  return retVal;
}