import { ValidationKey } from '../../mdkeys';

export interface ValidatorDef {
  fn: Validator;
  test: string;
  meta: ValidationKey;
}

export interface ValidationInstruction {
  navkey: string;
  key: string;
  trg: Object;
  proto: any;
  fn: Validator;
  tests: string[];
}

export interface ObjectTest {
  navkey: string;
  trg: Object;
  proto: any;
  props: PropertyTest[];
}

export interface PropertyTest {
  key: string;
  fns: Validator[];
}

export declare type Validator = (trg: Object, key: string, proto: any) => ValidatorOut;

export interface ValidatorOut {
  key: string;
  value: unknown;
  valid: boolean;
  message?: string;
}

export interface ValidationResult extends ValidatorOut {
  navkey: string;
}

export interface ValidationSummary {
  valid: boolean;
  errors?: Record<string, string[]>;
}
