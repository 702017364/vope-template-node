import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from './rollup.babel';
import config from './config';
import develop from './develop';

const { rollupPlugins } = config;
const plugins = [];

plugins.push(
  babel(),
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  commonjs(),
  json(),
);

develop || plugins.push(terser());

if(Array.isArray(rollupPlugins)){
  rollupPlugins.forEach((item, index) => item
    && item.name
    && plugins.splice(index, 1, item));
}

export default plugins;