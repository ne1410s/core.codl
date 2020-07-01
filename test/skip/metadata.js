const expect = require('chai').expect;
const ne_codl = require('../../dist/ne14_codl.umd.min.js.test');

describe('@Metadata', () => {
  it('@description', () => {
    const sut = new ne_codl.MetadataTestModel('hello, world');
    expect(sut.testMe).to.be.undefined;
    expect(sut.testMeDescription).to.equal('woot');
  });

  it('@displayName', () => {
    const sut = new ne_codl.MetadataTestModel('hello, world');
    expect(sut.testMeToo).to.equal('foo');
    expect(sut.testMeTooDisplayName).to.equal('bar');
  });

  it('@format', () => {
    const sut = new ne_codl.MetadataTestModel('hello, world');
    expect(sut.price).to.equal(12.4534);
    expect(sut.priceFormatted).to.equal('£12.45');
    sut.price = 333.555;
    expect(sut.priceFormatted).to.equal('£333.56');
  });
});
