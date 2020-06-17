const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation (result)', () => {
  
  it('Invalid Result', () => {
    const sut = new ne_codl.ValidationResultTestModel();
    expect(sut.myString).to.be.undefined;
    const invalidResult = sut.testValidity();
    sut.myString = 'hello';
    const validResult = sut.testValidity();
    expect(invalidResult.valid).to.be.false;
    expect(validResult.valid).to.be.true;
  });

});