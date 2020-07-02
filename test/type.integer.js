const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Type.integer', () => {
  it('from number -> valid', () => {
    const sut = new ne_codl.TypeIntegerTestModel();
    sut.myInteger = 8;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from string -> valid', () => {
    const sut = new ne_codl.TypeIntegerTestModel();
    sut.myInteger = '-12.0';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from mixed array -> valid', () => {
    const sut = new ne_codl.TypeIntegerTestModel();
    sut.myInteger = 0;
    sut.myIntegers = [-4, 0, 12, '82'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from bad number -> invalid', () => {
    const sut = new ne_codl.TypeIntegerTestModel();
    sut.myInteger = 8.003;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myInteger']).to.not.be.undefined;
    expect(summary.errors['myInteger'].length).to.equal(1);
    expect(summary.errors['myInteger'][0]).to.equal('My Int is not a valid integer');
  });

  it('from bad string -> invalid', () => {
    const sut = new ne_codl.TypeIntegerTestModel();
    sut.myInteger = '-12.9998';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myInteger']).to.not.be.undefined;
    expect(summary.errors['myInteger'].length).to.equal(1);
    expect(summary.errors['myInteger'][0]).to.equal('My Int is not a valid integer');
  });

  it('from bad mixed array -> invalid', () => {
    const sut = new ne_codl.TypeIntegerTestModel();
    sut.myInteger = 0;
    sut.myIntegers = ['4', 4, '4.4'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myIntegers']).to.not.be.undefined;
    expect(summary.errors['myIntegers'].length).to.equal(1);
    expect(summary.errors['myIntegers'][0]).to.equal('myIntegers contains an invalid integer');
  });
});
