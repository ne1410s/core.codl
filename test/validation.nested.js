const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation (nested)', () => {

  // it('not provided -> valid', () => {
  //   const sut = new ne_codl.ValidationNestedTestModel();
  //   let summary = ne_codl.ReflectValidation.validate(sut);
  //   expect(summary.valid).to.be.true;
  // });

  // it('custom error message', () => {
  //   const sut = new ne_codl.ValidationNestedTestModel();
  //   sut.myArr = [new ne_codl.ValidationNestedSubModel()];
  //   let summary = ne_codl.ReflectValidation.validate(sut);
  //   expect(summary.valid).to.be.false;
  //   const nestErr = summary.errors['myArr[0].myString'];
  //   expect(nestErr).to.not.be.undefined;
  //   expect(nestErr.length).to.equal(1);
  //   expect(nestErr[0]).to.equal('Nested String is required');
  // });

  it('ts cast', () => {
    const summary = ne_codl.TestNesting(JSON.parse('{ "nummy": "xyz" }'));
    expect(summary.valid).to.equal(false);
  });

});