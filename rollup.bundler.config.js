import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// CommonJS and ES module builds (for node and bundlers)
export default {
  input: 'src/index.ts',
  external: ['reflect-metadata'],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [typescript({ include: ['src/**/*.ts'] })],
};
