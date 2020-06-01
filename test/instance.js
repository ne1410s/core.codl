const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Instance Decorators', () => {
  
  it('@init', () => {
    const initStr = 'hello, world';
    const sut = new ne_codl.TestDeclarations(initStr);
    expect(sut instanceof ne_codl.TestDeclarations).to.be.true;
    expect(sut.initStr).to.not.equal(initStr);
  });

});

// TODO: import 'reflect-metadata' library for reflection