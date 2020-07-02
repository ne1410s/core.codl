const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation.forbidden', () => {
  it('unset values -> valid', () => {
    const sut = new ne_codl.ValidationForbiddenTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.true;
  });

  it('set forbidden -> invalid', () => {
    const sut = new ne_codl.ValidationForbiddenTestModel();
    sut.myBool = false;
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    const boolErr = summary.errors['myBool'];
    expect(boolErr).to.not.be.undefined;
    expect(boolErr.length).to.equal(1);
    expect(boolErr[0]).to.equal('myBool is forbidden');
  });
});
