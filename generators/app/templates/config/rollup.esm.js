import path from 'path';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import pkg from '../package.json';

const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ],
  plugins: [
    'emotion',
    '@babel/proposal-class-properties',
  ],
};

export default {
  input: path.resolve(process.cwd(), 'src/js/lib/chart.js'),
  output: {
    file: path.resolve(process.cwd(), pkg.module),
    format: 'es',
  },
  external: [
    'react',
    'react-dom',
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    json(),
    alias({
      resolve: ['.jsx', '.js'],
    }),
    babel(babelOpts),
    resolve({
      preferBuiltins: true,
      extensions: ['.js', '.jsx'],
      modulesOnly: true,
    }),
  ],
};
