import { ClassDecorator, ClassDecoratorAdvanced, Instantiable } from "./types";

/** Class decorator that pointlessly logs the ctor. */
export const log: ClassDecorator = ctor => {
  console.log(ctor);
};

/** Some other sh1t. */
export const logme = (ctor: any) => {
  console.log(ctor);
};