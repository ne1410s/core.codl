import 'reflect-metadata';
import { ValidationKeys } from "../shared-keys";
import { RecordKey } from "../types";

/** Reflects and processes validation decorations. */
export abstract class ReflectValidation {

  /**
   * Retrieves whether a property is valid according to its required status.
   * @param target The parent object.
   * @param key The property key.
   */
  public static readonly isValid_Required = (target: Object, key: RecordKey): boolean => {
    let retVal = true;
    const decorated = Reflect.getMetadata(ValidationKeys.REQUIRED, target, key) === true;
    if (decorated) {
      const val = (target as any)[key];
      retVal = val != null && val != '';
    }

    return retVal;
  }
}
