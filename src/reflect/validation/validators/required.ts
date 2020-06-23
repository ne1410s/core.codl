import { ValidationKey } from "../../../shared-keys";
import { ReflectMetadata } from "../../metadata";
import { Validator, ValidatorOut, isProvided } from "../model";

/** Validates required items. 0, 0n and false are allowed */
export const RequiredValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };

  if (!isProvided(value) || value === NaN) {

    const required = Reflect.getMetadata(ValidationKey.REQUIRED, trg, key) === true;
    if (required) {
      
      const name = ReflectMetadata.getDisplayName(trg, key);
      retVal.message = `${name} is required`;
    }
  }

  retVal.valid = !retVal.message;


  console.log('REQUIRED VALIDATOR FOR:', key, 'prov?', isProvided(value), 'ersult', retVal);


  return retVal;
}