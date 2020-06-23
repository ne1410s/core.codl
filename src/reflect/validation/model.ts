import { Ctor } from "../../types";

export declare type Validator = (trg: Object, key: string, proto: any) => ValidatorOut;
export declare type CValidator = (val: unknown, trg: Object) => string | boolean;

export interface ValidatorOut {
  value: unknown;
  valid: boolean;
  message?: string;
}

export const isProvided = (v: unknown) => v !== null && v !== undefined && v !== '';