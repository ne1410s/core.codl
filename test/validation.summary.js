const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation (summary)', () => {
  
  it('decorated, invalid -> summary invalid', () => {
    const sut = new ne_codl.ValidationSummaryTestModel();
    expect(sut.myString).to.be.undefined;
    const summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
  });

  it('decorated, valid -> summary valid', () => {
    const sut = new ne_codl.ValidationSummaryTestModel();
    sut.myString = 'hi';
    const summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('undecorated -> summary valid', () => {
    const sut = { test: true };
    const summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

});