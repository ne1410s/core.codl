const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.options', () => {
  it('unset values -> valid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('set good value -> valid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.myString = 'item33';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('set bad value -> invalid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.myString = 'item2';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const strErrors = summary.errors['myString'];
    expect(strErrors).to.not.be.undefined;
    expect(strErrors.length).to.equal(1);
    expect(strErrors[0]).to.equal('myString is an invalid option');
  });

  it('set bad value in range -> invalid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.myBooleans = [false];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const boolsErrors = summary.errors['myBooleans'];
    expect(boolsErrors).to.not.be.undefined;
    expect(boolsErrors.length).to.equal(1);
    expect(boolsErrors[0]).to.equal('myBooleans contains an invalid option');
  });
});
