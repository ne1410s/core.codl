const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.regex', () => {
  
  it('bad format -> invalid', () => {
    const sut = new ne_codl.ValidationRegexTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const errs = summary.errors['myString'];
    expect(errs.length).to.equal(1);
    expect(errs[0]).to.equal('myString is invalid');
  });

  it('missing -> valid', () => {
    const sut = new ne_codl.ValidationRegexTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    const errs = summary.errors['myNumber'];
    expect(errs.length).to.equal(1);
    expect(errs[0].indexOf('invalid')).to.equal(-1);
  });

  it('provided, good -> valid', () => {
    const sut = new ne_codl.ValidationRegexTestModel();
    sut.myNumber = 8;
    sut.myString = '123';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('empty string -> always valid', () => {
    const sut = new ne_codl.ValidationRegexTestModel();
    sut.myNumber = 8;
    sut.myString = '';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('array regex -> invalid item', () => {
    const sut = new ne_codl.ValidationRegexTestModel();
    sut.myNumber = 8;
    sut.myString = '123';
    sut.myVals.push('defcon5');
    let summary = ne_codl.ReflectValidation.validate(sut);
    const arrErrs = summary.errors['myVals'];
    expect(arrErrs).to.not.be.undefined;
    expect(arrErrs.length).to.equal(1);
    expect(arrErrs[0]).to.equal('myVals contains an invalid item');
  });

});