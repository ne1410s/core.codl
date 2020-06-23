import { ValidationKey } from '../../../shared-keys';
import { ReflectMetadata } from '../../metadata';
import { Validator, ValidatorOut, CValidator } from '../model';

/** Validates with a custom function. */
export const CustomValidator: Validator = (trg, key) => {

  const value = (trg as any)[key];
  const retVal: ValidatorOut = { value, valid: true };
  
  const fn = Reflect.getMetadata(ValidationKey.CUSTOM, trg, key) as CValidator;
  const result = fn(value, trg);
  const hasCustomErrorMessage = (typeof result === 'string' && result.length != 0);
  
  if (hasCustomErrorMessage) retVal.message = result as string;
  else if (result === false) {
    const name = ReflectMetadata.getDisplayName(trg, key);
    retVal.message = `${name} is invalid`;
  }
  
  retVal.valid = !retVal.message;
  return retVal;
}