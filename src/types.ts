export interface Ctor<T> { new (...args: any[]): T };
//export interface CtorNoParams<T> { new (): T };

export declare type RecordKey = string | symbol;
export declare type FunctionDecorator = (trg: Object, key: RecordKey, desc: PropertyDescriptor) => void;

/** Decorator for a property accessor of a given type. */
export declare type TypedAccessorDecorator<P> =
  <K extends RecordKey, T extends Record<K, P>>
    (target: T, key: K, desc: TypedPropertyDescriptor<P>) => void;

/** Decorator for a property or field of a given type. */
export declare type TypedPropertyDecorator<P> =
  <K extends RecordKey, T extends Record<K, P>>
    (target: T, key: K) => void;

/** Decorator for a function argument of a given type. */
export declare type TypedArgumentDecorator<P> =
  <K extends RecordKey, T extends Record<K, P>>
    (target: T, key: K, idx: number) => void;