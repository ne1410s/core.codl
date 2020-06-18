export declare type Validator = (trg: Object, key: string) => ValidatorOut;

export interface ValidatorOut {
  value: any;
  valid: boolean;
  message?: string;
}