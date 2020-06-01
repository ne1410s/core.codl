export declare type Instantiable<T> = { new (...args: any[]): T };

export declare type InstanceDecorator<T> = (ctor: Instantiable<T>) => Instantiable<T>;
export declare type FunctionDecorator = (trg: Object, key: string | symbol, desc: PropertyDescriptor) => void;
export declare type PropertyDecorator = (trg: Object, key: string | symbol) => any;
export declare type ArgumentDecorator = (trg: Object, key: string | symbol, idx: number) => void;
