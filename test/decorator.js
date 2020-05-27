const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.cjs.min');

describe('behaviour.sealed', () => {
  
  it('prevents adding new properties', () => {
    var y = new ne_codl.SealedMemo();
    y['chapstick'] = 222;
    expect(y.chapstick).to.be.undefined;
  });

  it('default prevails if not used', () => {
    var y = new ne_codl.Memo();
    y['chapstick'] = 222;
    expect(y.chapstick).to.not.be.undefined;
  });

});

// TODO: Use of examples- ideally specifying them as part of the test!
// TODO: Resolve the above failing test
// TODO: Improve types.ts (and general src structure!)
// TODO: Add a butt-load of functionality!
// TODO: import 'reflect-metadata' library for reflection