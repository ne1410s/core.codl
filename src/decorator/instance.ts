/** Exposes newly-constructed instances. */
export const expose = (ctor: Function, cb: (item: any) => void) => {
  
  const retVal = (...args: any[]) => {    
    const maker: any = function() { return ctor.apply(this, args); }
    maker.prototype = ctor.prototype;
    const instance = new maker();
    cb(instance);
    return instance;
  }

  retVal.prototype = ctor.prototype;
  return retVal;
}
