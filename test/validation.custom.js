const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.custom', () => {
  
  it('generic, formatted error message', () => {
    const sut = new ne_codl.ValidationCustomTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const strErrs = summary.errors['myString'];
    expect(strErrs).to.not.be.undefined;
    expect(strErrs.length).to.equal(1);
    expect(strErrs[0]).to.equal('My String is invalid');
  });

  it('custom error message', () => {
    const sut = new ne_codl.ValidationCustomTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const numErrs = summary.errors['myNumber'];
    expect(numErrs).to.not.be.undefined;
    expect(numErrs.length).to.equal(1);
    expect(numErrs[0]).to.equal('no strings allowed');
  });

  it('passes validation', () => {
    const sut = new ne_codl.ValidationCustomTestModel();
    delete sut.myString;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

});