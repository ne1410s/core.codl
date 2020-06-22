const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.range', () => {
  
  it('all ok -> valid', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myNumber = 28;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('range with format -> formatted error values', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myNumber = -100;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const numErrors = summary.errors['myNumber'];
    expect(numErrors.length).to.equal(1);
    expect(numErrors[0]).to.equal('Price must be between £20.00 and £50.00');
  });

  it('max val -> formatted error message', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myNumber = 50;
    sut.myNumberMax2 = 2.001;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const numErrs = summary.errors['myNumberMax2'];
    expect(numErrs).to.not.be.undefined;
    expect(numErrs.length).to.equal(1);
    expect(numErrs[0]).to.equal('myNumberMax2 cannot be greater than 2');
  });

  it('min date -> formatted error message', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myDate = new Date(1989, 5, 5);
    sut.myString = 'hi';
    sut.myNumber = 25;
    sut.myNumberMin3 = 2;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const dateErrs = summary.errors['myDate'];
    expect(dateErrs).to.not.be.undefined;
    expect(dateErrs.length).to.equal(1);
    expect(dateErrs[0]).to.equal('myDate cannot be before 1/2/2000');
  });

  it('empty array with min -> invalid', () => {
    const sut = new ne_codl.ValidationRangeTestModel();
    sut.myNumber = 28;
    sut.myStrArr = [];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const arrErrs = summary.errors['myStrArr'];
    expect(arrErrs).to.not.be.undefined;
    expect(arrErrs.length).to.equal(1);
    expect(arrErrs[0]).to.equal('myStrArr cannot contain fewer than 3 items');
  });

});