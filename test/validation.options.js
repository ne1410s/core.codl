const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.options', () => {
  it('unset values -> valid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.day = 0;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('set good values -> valid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.day = 0;
    sut.myString = 'item33';
    sut.color = 1;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('set bad string value -> invalid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.day = 0;
    sut.myString = 'item2';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const strErrors = summary.errors['myString'];
    expect(strErrors).to.not.be.undefined;
    expect(strErrors.length).to.equal(1);
    expect(strErrors[0]).to.equal('myString is an invalid option');
  });

  it('set bad enum array value -> invalid', () => {
    const sut = new ne_codl.ValidationOptionsTestModel();
    sut.day = 0;
    sut.licences = ['woot'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const lcErrors = summary.errors['licences'];
    expect(lcErrors).to.not.be.undefined;
    expect(lcErrors.length).to.equal(1);
    expect(lcErrors[0]).to.equal('licences contains an invalid option');
  });
});
