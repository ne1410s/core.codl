export declare type Instantiable = { new (...args: any[]): {} };

export declare type ClassDecorator = (ctor: Function) => void;
export declare type ClassDecoratorAdvanced<T extends Instantiable> = (ctor: T) => T;

export declare type FunctionDecorator = (trg: Object, key: string | symbol, desc: PropertyDescriptor) => PropertyDescriptor;
export declare type PropertyDecorator = (trg: Object, key: string | symbol) => any;
export declare type ArgumentDecorator = (trg: Object, key: string | symbol, idx: number) => void;