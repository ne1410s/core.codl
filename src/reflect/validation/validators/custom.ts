import { ValidationKey } from '../../../shared-keys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut, CValidator } from '../model';

/** Validates with a custom function. */
export const CustomValidator: Validator = (trg, key, proto) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };
  
  const fn = Reflect.getMetadata(ValidationKey.CUSTOM, proto, key) as CValidator;
  const result = fn(value, trg);
  const hasCustomErrorMessage = (typeof result === 'string' && result.length != 0);
  
  if (hasCustomErrorMessage) retVal.message = result as string;
  else if (result === false) {
    const name = ReflectMetadata.getDisplayName(proto, key);
    retVal.message = `${name} is invalid`;
  }
  
  retVal.valid = !retVal.message;
  return retVal;
}