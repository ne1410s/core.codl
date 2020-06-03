const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Instance Decorators', () => {
  
  it('@test', () => {
    const sut = new ne_codl.TestClass1('hello, world');
    expect(sut instanceof ne_codl.TestClass1).to.be.true;
    expect(sut.testMe).to.equal(true);
  });

});