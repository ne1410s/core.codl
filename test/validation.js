const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Validation Decoration', () => {
  
  it('@required (unset boolean -> invalid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myBool).to.be.undefined;
    expect(sut.testValidity('myBool')).to.equal(false);
  });

  it('@required (unset optional boolean -> invalid, set false -> valid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myOptionalBool).to.be.undefined;
    expect(sut.testValidity('myOptionalBool')).to.equal(false);
    sut.myOptionalBool = false;
    expect(sut.testValidity('myOptionalBool')).to.equal(true);
  });

  it('@required (unset number -> invalid, set 0 -> valid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myNumber).to.be.undefined;
    expect(sut.testValidity('myNumber')).to.equal(false);
    sut.myNumber = 0;
    expect(sut.testValidity('myNumber')).to.equal(true);
  });

  it('@required (undecorated -> valid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myUndecorated).to.be.undefined;
    expect(sut.testValidity('myUndecorated')).to.equal(true);
  });

  it('@required (empty string -> invalid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myString).to.equal('');
    expect(sut.testValidity('myString')).to.equal(false);
  });

  it('@required (whitespace string -> valid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myOtherString).to.equal(' ');
    expect(sut.testValidity('myOtherString')).to.equal(true);
  });

  it('@required (non-existant -> valid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.rarara).to.be.undefined;
    expect(sut.testValidity('rarara')).to.equal(true);
  });

  it('@required (null accessor -> invalid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myNullAccessor).to.not.be.undefined;
    expect(sut.testValidity('myNullAccessor')).to.equal(false);
  });

  it('@required (null accessor -> invalid)', () => {
    const sut = new ne_codl.ValidationTestModel('hello, world');
    expect(sut.myPresentAccessor).to.equal(33);
    expect(sut.testValidity('myPresentAccessor')).to.equal(true);
  });

});