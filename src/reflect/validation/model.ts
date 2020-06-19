export declare type Validator = (trg: Object, key: string) => ValidatorOut;

export interface ValidatorOut {
  value: unknown;
  valid: boolean;
  message?: string;
}

export const isProvided = (v: unknown) => v !== null && v !== undefined && v !== '';