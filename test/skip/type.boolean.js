const expect = require('chai').expect;
const ne_codl = require('../../dist/ne14_codl.umd.min.js.test');

describe('@Type.boolean', () => {
  it('from boolean -> valid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = true;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });
  
  it('from number -> valid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = 0;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from string -> valid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = 'FALSE';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from mixed array -> valid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = false;
    sut.myBooleans = [true, false, 0, 1, 'TruE', 'faLSe'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from bad number -> invalid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = 2;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myBoolean']).to.not.be.undefined;
    expect(summary.errors['myBoolean'].length).to.equal(1);
    expect(summary.errors['myBoolean'][0]).to.equal('My Bool is not a valid boolean');
  });

  it('from bad string -> invalid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = 'falseez';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myBoolean']).to.not.be.undefined;
    expect(summary.errors['myBoolean'].length).to.equal(1);
    expect(summary.errors['myBoolean'][0]).to.equal('My Bool is not a valid boolean');
  });

  it('from bad mixed array -> invalid', () => {
    const sut = new ne_codl.TypeBooleanTestModel();
    sut.myBoolean = false;
    sut.myBooleans = [true, false, 0, 1, 'Tru3', 'faLSe'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    expect(summary.errors['myBooleans']).to.not.be.undefined;
    expect(summary.errors['myBooleans'].length).to.equal(1);
    expect(summary.errors['myBooleans'][0]).to.equal('myBooleans contains an invalid boolean');
  });
});
