const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Instance Decorators', () => {
  
  it('@init', () => {
    const sut = new ne_codl.TestClass1('hello, world');
    expect(sut instanceof ne_codl.TestClass1).to.be.true;
    expect(sut.prop1).to.equal('first this');
  });

});

// TODO: import 'reflect-metadata' library for reflection