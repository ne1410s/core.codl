const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.required', () => {
  
  it('unset boolean -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myBool'].length).to.equal(1);
  });

  it('unset optional boolean -> invalid, set false -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myOptionalBool'].length).to.equal(1);
    sut.myOptionalBool = false;
    summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myOptionalBool']).to.be.undefined;
  });

  it('unset number -> invalid, set 0 -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myNumber'].length).to.equal(1);
    sut.myNumber = 0;
    summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myNumber']).to.be.undefined;
  });

  it('unset string -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    delete sut.myString;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myString'].length).to.equal(1);
  });

  it('empty string -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myString).to.equal('');
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myString'].length).to.equal(1);
  });

  it('whitespace string -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myOtherString).to.equal(' ');
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myOtherString']).to.be.undefined;
  });

  it('undecorated -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myUndecorated']).to.be.undefined;
  });

  it('non-existant -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.rarara).to.be.undefined;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['rarara']).to.be.undefined;
  });

  it('null accessor -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myNullAccessor).to.not.be.undefined;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myNullAccessor'].length).to.equal(1);
  });

  it('present accessor -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myPresentAccessor).to.equal(33);
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.errors['myPresentAccessor']).to.be.undefined;
  });

});