
export declare type InstanceDecorator = (ctor: Function) => any;
export declare type FunctionDecorator = (trg: Object, key: string | symbol, desc: PropertyDescriptor) => PropertyDescriptor;
export declare type PropertyDecorator = (trg: Object, key: string | symbol) => any;
export declare type ArgumentDecorator = (trg: Object, key: string | symbol, idx: number) => void;