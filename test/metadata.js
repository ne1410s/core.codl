const expect = require('chai').expect;
const ne_codl = require('../dist/ne14_codl.umd.min.js.test');

describe('Metadata Decorators', () => {
  
  it('@name, getName', () => {
    const sut = new ne_codl.TestClass1('hello, world');
    expect(sut.testMeToo).to.equal('foo');
    expect(sut.getTestMeTooName).to.equal('bar');
  });

  it('@fmt, getFmt', () => {
    const sut = new ne_codl.TestClass1('hello, world');
    expect(sut.price).to.equal(12.4534);
    expect(sut.__get_price()).to.equal('£12.45');
    sut.price = 333.555;
    expect(sut.__get_price()).to.equal('£333.56');
  });
});