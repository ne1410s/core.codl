import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut } from "../model";

/** Validates required items. 0, 0n and false are allowed */
export const RequiredValidator: Validator = (trg, key) => {
  
  const value = (trg as any)[key];
  const provided = value !== null && value !== undefined && value !== NaN && value !== '';
  const retVal: ValidatorOut = { value, valid: true };

  if (!provided) {

    const required = Reflect.getMetadata(ValidationKey.REQUIRED, trg, key) === true;
    if (required) {
      
      const name = ReflectMetadata.getDisplayName(trg, key);
      retVal.message = `${name} is required`;
      retVal.valid = false;
    }
  }
  
  return retVal;
}