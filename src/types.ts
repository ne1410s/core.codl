export interface Ctor<T> { new (...args: any[]): T };

export declare type RecordKey = string | symbol;
export declare type InstanceDecorator<T> = (ctor: Ctor<T>) => Ctor<T>;
export declare type FunctionDecorator = (trg: Object, key: RecordKey, desc: PropertyDescriptor) => void;
export declare type PropertyDecorator = (trg: Object, key: RecordKey) => void;
export declare type ArgumentDecorator = (trg: Object, key: RecordKey, idx: number) => void;

/** Defines a decorator for an accessor of type <P>. */
export declare type TypedAccessorDecorator<P> =
  <K extends RecordKey, T extends Record<K, P>>
    (target: T, key: K, desc: TypedPropertyDescriptor<P>) => void;

/** Defines a decorator for a property or field of type <P>. */
export declare type TypedPropertyDecorator<P> =
  <K extends RecordKey, T extends Record<K, P>>
    (target: T, key: K) => void;

/** Defines a decorator for an argument of type <P>. */
export declare type TypedArgumentDecorator<P> =
  <K extends RecordKey, T extends Record<K, P>>
    (target: T, key: K, idx: number) => void;