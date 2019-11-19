import fs from 'fs';
import { join } from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const re = /^[^.\/]/;
const whitelist = Array.from(new Set([
  /^@babel\/runtime/,
]));

class External {
  constructor(){
    this.package();
  }

  package(){
    const file = join(__dirname, 'package.json');
    const data = fs.readFileSync(file);
    const { dependencies } = JSON.parse(data);
    this.dependencies = dependencies;
  }

  whitelist(id){
    return whitelist.some((value) => {
      if(value instanceof RegExp){
        return value.test(id);
      } else if(typeof value == 'function'){
        return value(id);
      } else{
        return value === id;
      }
    });
  }

  then(id){
    return !this.whitelist(id) && re.test(id) || id in this.dependencies;
  }
}

const external = new External();

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    json(),
    commonjs(),
  ],
  external(id){
    return external.then(id);
  },
};