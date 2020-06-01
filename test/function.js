const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Function Decorators', () => {
  
  it('@input', () => {
    const sut = new ne_codl.TestDeclarations();
    const fnVal = sut.testFuncInput('hello, world');
    expect(fnVal.includes('world')).to.be.false;
  });

  it('@output', () => {
    const sut = new ne_codl.TestDeclarations('me');
    const fnVal = sut.testFuncOutput('you');
    expect(fnVal.startsWith('hey')).to.be.false;
    expect(fnVal.startsWith('YO:')).to.be.true;
  });

});

// TODO: import 'reflect-metadata' library for reflection