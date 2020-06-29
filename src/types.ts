/** A constructor. */
export interface Ctor<T> {
  new (...args: any[]): T;
}

/** A record key. */
export declare type RecordKey = string | symbol;

/** 'Primitive' types, or an approximation of. */
export declare type Primitive = string | number | boolean | Date;

/** Decorator for a function. */
export declare type FunctionDecorator = (
  trg: Object,
  key: RecordKey,
  desc: PropertyDescriptor
) => void;

/** Decorator for a property accessor of a given type. */
export declare type TypedAccessorDecorator<P> = <K extends RecordKey, T extends Record<K, P>>(
  target: T,
  key: K,
  desc: TypedPropertyDescriptor<P>
) => void;

/** Decorator for a property or field of a given type. */
export declare type TypedPropertyDecorator<P> = <K extends RecordKey, T extends Record<K, P>>(
  target: T,
  key: K
) => void;

/** Decorator for a function argument of a given type. */
export declare type TypedArgumentDecorator<P> = <K extends RecordKey, T extends Record<K, P>>(
  target: T,
  key: K,
  idx: number
) => void;

/**
 * Whether a value is considered as having been provided.
 * Certain 'falsy' values pass, including 0, 0n, NaN.
 */
export const isProvided = (v: unknown) => v !== null && v !== undefined && v !== '';

/**
 * Custom validator function. The value is supplied, along with the object and
 * prototype information (to best retrieve other metadata if required).
 */
export declare type CustomValidator = (val: unknown, obj: Object, proto: any) => string | boolean;
