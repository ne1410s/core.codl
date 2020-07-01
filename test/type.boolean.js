const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

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
});
