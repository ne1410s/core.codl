const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.required', () => {
  
  it('unset boolean -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myBool).to.be.undefined;
    expect(sut.testValidity('myBool')).to.equal(false);
  });

  it('unset optional boolean -> invalid, set false -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myOptionalBool).to.be.undefined;
    expect(sut.testValidity('myOptionalBool')).to.equal(false);
    sut.myOptionalBool = false;
    expect(sut.testValidity('myOptionalBool')).to.equal(true);
  });

  it('unset number -> invalid, set 0 -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myNumber).to.be.undefined;
    expect(sut.testValidity('myNumber')).to.equal(false);
    sut.myNumber = 0;
    expect(sut.testValidity('myNumber')).to.equal(true);
  });

  it('undecorated -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myUndecorated).to.be.undefined;
    expect(sut.testValidity('myUndecorated')).to.equal(true);
  });

  it('empty string -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myString).to.equal('');
    expect(sut.testValidity('myString')).to.equal(false);
  });

  it('whitespace string -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myOtherString).to.equal(' ');
    expect(sut.testValidity('myOtherString')).to.equal(true);
  });

  it('non-existant -> valid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.rarara).to.be.undefined;
    expect(sut.testValidity('rarara')).to.equal(true);
  });

  it('null accessor -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myNullAccessor).to.not.be.undefined;
    expect(sut.testValidity('myNullAccessor')).to.equal(false);
  });

  it('null accessor -> invalid', () => {
    const sut = new ne_codl.ValidationRequiredTestModel();
    expect(sut.myPresentAccessor).to.equal(33);
    expect(sut.testValidity('myPresentAccessor')).to.equal(true);
  });

});