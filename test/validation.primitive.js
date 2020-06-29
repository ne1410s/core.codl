const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.primitive', () => {
  it('number set as boolean -> invalid', () => {
    const sut = new ne_codl.ValidationPrimitiveTestModel();
    sut.myNumber = true;
    let summary = ne_codl.ReflectValidation.validate(sut);
    const numErrs = summary.errors['myNumber'];
    expect(numErrs).to.not.be.undefined;
    expect(numErrs.length).to.equal(1);
    expect(numErrs[0]).to.equal('Nummynum is not a valid number');
  });
});
