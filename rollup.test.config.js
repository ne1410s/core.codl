import * as basis from './rollup.browser.config';

basis.default.input = 'test/src/index.ts';
basis.default.output.file += '.test.js';
export default basis.default;
