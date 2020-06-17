const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation (result)', () => {
  
  it('Invalid Result', () => {
    const sut = new ne_codl.ValidationResultTestModel();
    expect(sut.myString).to.be.undefined;
    expect(sut.testValidity()).to.not.be.null;
  });

});