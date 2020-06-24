const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('@Validation (nested)', () => {

  it('type data taken from instance', () => {
    const inst = new ne_codl.ValidationNestingParentModel();
    inst.child = { doods: 'ss', ownKids: [{ myDate: new Date() }, null, {}] };
    let summary = ne_codl.ReflectValidation.validate(inst);
    expect(summary.valid).to.be.false;
  });

  it('type data supplied separately', () => {
    const type = ne_codl.ValidationNestingParentModel;
    const test = { num: 77 };
    let summary = ne_codl.ReflectValidation.validate(test, type);
    expect(summary.valid).to.be.false;
  });
  
});