export abstract class BehaviorDecorators {

  static Sealed: ClassDecorator = ctor => {
    Object.seal(ctor);
    Object.seal(ctor.prototype);
  }
}