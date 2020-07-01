const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Type.number', () => {
  it('from number -> valid', () => {
    const sut = new ne_codl.TypeNumberTestModel();
    sut.myNumber = 6.6;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true; 
  });

  it('from string -> valid', () => {
    const sut = new ne_codl.TypeNumberTestModel();
    sut.myNumber = '-12.0022';
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('from mixed array -> valid', () => {
    const sut = new ne_codl.TypeNumberTestModel();
    sut.myNumber = 0;
    sut.myNumbers = [-4, '0', Math.PI, '82.2'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });
});
