const expect = require('chai').expect;
const ne_codl = require('../../dist/ne14_codl.umd.min.js.test');

describe('@Type.date', () => {
  it('from Date -> valid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date(2002, 1, 14);
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from string -> valid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = '2002/02/14 09:34:17';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from mixed array -> valid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date();
    sut.myDates = [new Date(), '2020-03-19 17:00'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from number -> invalid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date().getTime();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myDate']).to.not.be.undefined;
    expect(summary.errors['myDate'].length).to.equal(1);
    expect(summary.errors['myDate'][0]).to.equal('My Date is not a valid date');
  });

  it('from bad string -> invalid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date().getTime() + '';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myDate']).to.not.be.undefined;
    expect(summary.errors['myDate'].length).to.equal(1);
    expect(summary.errors['myDate'][0]).to.equal('My Date is not a valid date');
  });

  it('from bad mixed array -> invalid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date();
    sut.myDates = [new Date(), 0];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myDates']).to.not.be.undefined;
    expect(summary.errors['myDates'].length).to.equal(1);
    expect(summary.errors['myDates'][0]).to.equal('myDates contains an invalid date');
  });
});
