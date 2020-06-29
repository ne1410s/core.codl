import { Validation, Metadata } from '../../../src/index';

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

  @Metadata.model(ValidationNestingGrandchildModel)
  public ownKids: ValidationNestingGrandchildModel[];
}

export class ValidationNestingParentModel {
  @Validation.required
  @Metadata.model(ValidationNestingChildModel)
  public child: ValidationNestingChildModel;

  @Validation.required
  public num: number;
}
