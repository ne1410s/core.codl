import { ReflectMetadata } from "../../..";
import { ValidationKey } from "../../../shared-keys";
import { Validator, ValidatorOut } from "../model";

/** Validates required items. 0, 0n and false are allowed */
export const RequiredValidator: Validator = (trg, key) => {
  const value = (trg as any)[key];
  const required = Reflect.getMetadata(ValidationKey.REQUIRED, trg, key) === true;
  const present = value !== null && value !== undefined && value !== NaN && value !== '';
  const valid = present || !required;
  const retVal: ValidatorOut = { value, valid };
  if (!retVal.valid) {
    const name = ReflectMetadata.getDisplayName(trg, key);
    retVal.message = `${name} is required`;
  }
  
  return retVal;
}