import path from 'path';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';
import sass from 'rollup-plugin-sass';
import pkg from '../package.json';

const babelOpts = {
  babelrc: false,
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
  input: path.resolve(process.cwd(), 'src/js/lib/global.js'),
  external: ['d3'],
  output: {
    file: path.resolve(process.cwd(), pkg.main),
    format: 'iife',
    name: '<%= clsName %>',
    globals: {
      d3: 'd3',
    },
  },
  plugins: [
    sass({
      output: path.resolve(process.cwd(), pkg.style),
    }),
    json(),
    alias({
      resolve: ['.jsx', '.js'],
    }),
    babel(babelOpts),
    resolve({
      main: true,
      preferBuiltins: true,
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    uglify(),
  ],
};
