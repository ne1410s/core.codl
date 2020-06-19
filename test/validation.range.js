const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.range', () => {
  
  it('all ok -> valid', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myNumber = 28;
    sut.myString = 'hi';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('range with format -> formatted error values', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myNumber = -100;
    sut.myString = 'hi';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const numErrors = summary.errors['myNumber'];
    expect(numErrors.length).to.equal(1);
    expect(numErrors[0]).to.equal('Price must be between £20.00 and £50.00');
  });

  it('min date -> formatted error values', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myDate = new Date(1989, 5, 5);
    sut.myString = 'hi';
    sut.myNumber = 25;
    sut.myNumberMin3 = 2;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
  });

});