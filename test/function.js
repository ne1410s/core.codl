const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Function Decorators', () => {
  
  it('@input', () => {
    const sut = new ne_codl.TestClass1('hello, world');
    expect(sut.format1()).to.equal('fmt1');
  });

  it('@output', () => {
    const sut = new ne_codl.TestClass1('me');
    expect(sut.format2('you')).to.equal('fmt2: you');
  });

  it('@...', () => {
    const sut = new ne_codl.TestClass1('me');
    expect(sut.testFn('dfdf', true)).to.not.be.null;
  });

});