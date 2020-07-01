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
});
