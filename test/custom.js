const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Custom Decoration', () => {
  
  it('@*', () => {
    new ne_codl.CustomTestModel('hello, world');
  });

});