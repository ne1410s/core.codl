const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Function Decorators', () => {
  
  it('Test 1', () => {
    const greeting = 'hello, world';
    const greeter = new ne_codl.Greeter();
    const fnVal = greeter.makeGreeting(greeting);
    expect(fnVal.startsWith('hey')).to.be.false;
  });

});
