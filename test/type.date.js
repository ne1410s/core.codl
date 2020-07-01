const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Type.date', () => {
  it('from Date -> valid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date(2002, 1, 14);
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;  
  });

  it('from number -> valid', () => {
    const sut = new ne_codl.TypeDateTestModel();
    sut.myDate = new Date().getTime();
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
    sut.myDates = [new Date(), 12323234, '2020-03-19 17:00'];
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });
});
