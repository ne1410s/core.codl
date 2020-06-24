import { CustomValidator } from '../../../types';
import { ValidationKey } from '../../../mdkeys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut } from '../models';

/** Validates with a custom function. */
export const CustValidator: Validator = (trg, key, proto) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { key, value, valid: true };
  
  const fn = Reflect.getMetadata(ValidationKey.CUSTOM, proto, key) as CustomValidator;
  const result = fn(value, trg, proto);
  const hasCustomErrorMessage = (typeof result === 'string' && result.length != 0);
  
  if (hasCustomErrorMessage) retVal.message = result as string;
  else if (result === false) {
    const name = ReflectMetadata.getDisplayName(proto, key);
    retVal.message = `${name} is invalid`;
  }
  
  retVal.valid = !retVal.message;
  return retVal;
}