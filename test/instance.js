const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Instance Decorators', () => {
  
  it('Exhibits simple logging', () => {
    const greeting = 'hello, world';
    const sut = new ne_codl.Greeter(greeting);
    expect(sut instanceof ne_codl.Greeter).to.be.true;
    expect(sut.greeting).to.equal(greeting);
  });

});

// TODO: Improve types.ts (and general src structure!)
// TODO: Add a butt-load of functionality!
// TODO: import 'reflect-metadata' library for reflection