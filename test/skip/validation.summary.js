const expect = require('chai').expect;
const ne_codl = require('../../dist/ne14_codl.umd.min.js.test');

describe('@Validation (summary)', () => {
  it('decorated, invalid -> summary invalid, no display name', () => {
    const sut = new ne_codl.ValidationSummaryTestModel();
    expect(sut.myString).to.be.undefined;
    const summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myString'][0]).to.equal('myString is required');
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

  it('display name in message', () => {
    const sut = new ne_codl.ValidationSummaryTestModel();
    delete sut.myBool;
    const summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myBool'][0]).to.equal('My Boolean is required');
  });
});
