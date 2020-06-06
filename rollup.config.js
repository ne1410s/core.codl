import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// UMD build
export default {
  input: 'src/index.ts',
  external: [
    'reflect-metadata'
  ],
  output: {
    name: pkg.displayName,
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    typescript()
  ]
};