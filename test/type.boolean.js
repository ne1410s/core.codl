const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Type.boolean', () => {
  it('???', () => {
    const sut = new ne_codl.ValidationRegexTestModel();
    let summary = ne_codl.ReflectValidation.validate(sut);
    expect(summary.valid).to.be.false;
    
  });
});
