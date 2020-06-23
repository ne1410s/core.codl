import { Validation, Metadata, ReflectValidation, ValidationSummary } from '../../../src/index';
import { MetadataKey } from '../../../src/shared-keys';

export function TestNesting(obj: Object): ValidationSummary {
  return ReflectValidation.validate(ValidationNestingParentModel, obj);
}

export class ValidationNestingGrandchildModel {

  @Metadata.displayName('La date')
  @Validation.required
  public myDate: Date;
}

export class ValidationNestingChildModel {

  @Validation.required
  @Validation.max(5)
  public myNumMax5 = 5;

  @Validation.required
  public doods: string;

  @Metadata.type(ValidationNestingGrandchildModel)
  public ownKids: ValidationNestingGrandchildModel[];
}


export class ValidationNestingParentModel {

  @Validation.required
  @Metadata.type(ValidationNestingChildModel)
  public child: ValidationNestingChildModel;

  @Validation.required
  public num: number;
}
