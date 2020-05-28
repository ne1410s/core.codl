const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.cjs.min');

describe('behaviour.log', () => {
  
  it('test 1', () => {
    new ne_codl.LogDemo();
    new ne_codl.LogDemo('hiya');
  });

});

// TODO: Use of examples- ideally specifying them as part of the test!
// TODO: Resolve the above failing test
// TODO: Improve types.ts (and general src structure!)
// TODO: Add a butt-load of functionality!
// TODO: import 'reflect-metadata' library for reflection