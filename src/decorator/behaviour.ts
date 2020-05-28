import { InstanceDecorator } from './types';

export const log: InstanceDecorator = (ctor: Function) => {

  const retVal = (...args: any[]) => {
    
    const maker: any = function() {
      return ctor.apply(this, args);
    }

    maker.prototype = ctor.prototype;
    const instance = new maker();
    
    console.log('Created:', instance);
    return instance;
  }

  retVal.prototype = ctor.prototype;
  return retVal;
}

/*
export function logClass(trg: Function) {
 
  function construct(ctor: Function, args: any[]) {
    var c : any = function () {
      return ctor.apply(this, args);
    }
    c.prototype = ctor.prototype;
    return new c();
  }
 
  // the new constructor behaviour
  var f = (...args: any[]) => {
    const instance = construct(trg, args);
    console.log('Created:', instance);
    return instance;
  }
 
  // copy prototype so instanceof operator still works
  f.prototype = trg.prototype;
 
  // return new constructor (will override original)
  return f;
}
*/