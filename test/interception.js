const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Interception', () => {
  
  it('@initial', () => {
    const sut = new ne_codl.InterceptionTestModel('hello, world');
    expect(sut instanceof ne_codl.InterceptionTestModel).to.be.true;
    expect(sut.prop1).to.equal('first this');
  });

  it('@input', () => {
    const sut = new ne_codl.InterceptionTestModel('hello, world');
    expect(sut.format1()).to.equal('fmt1');
  });

  it('@output', () => {
    const sut = new ne_codl.InterceptionTestModel('me');
    expect(sut.format2('you')).to.equal('fmt2: you');
  });

});