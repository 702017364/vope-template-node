import { join } from 'path';
import merge from 'lodash/merge';
import joinUtil from '../util/join';
import T from './T';
import develop from './develop';
import { absolute_bin as dir } from './dist';

const defaultFormat = 'iife';
const re = /\.+[\\\/]+|[-_.]+([0-9a-z])/ig;
const f = /\.\w+$/g;

const conver = (value) => {
  const index = value.lastIndexOf('.');
  value = value.slice(0, index)
  return value.replace(re, ($0, $1) => $1.toLocaleUpperCase());
};

class Rollup {
  constructor(option){
    this.option = option;
    this.rollup = option.rollup;
    this.sourcemap = develop || option.sourcemap === true;
    this.init();
  }
  
  init = () => {
    let { rollup } = this;
    const option = merge({}, rollup);
    delete option.input;
    delete option.output;
    delete option.plugins;
    this.option.rollup = {
      option,
      list: this.formatRollup(
        rollup && typeof rollup == 'object'
          ? rollup
          : {}
      )
    };
  }

  formatRollup = (value) => {
    let { output, input } = merge({
      input: 'index.' + (this.option.ts === true ? 'ts' : 'js'),
      output: {
        format: defaultFormat
      },
    }, value);
    const files = [].concat(input);
    const { sourcemap } = this;
    const isArray = Array.isArray(output);
    if(!output || typeof output !== 'object'){
      output = {};
    } else if(isArray && output.length == 1){
      [ output ] = output;
    }
    const mapFn = () => {
      const getter = isArray
        ? (index) => {
            const option = output[index] || {};
            const { file } = option;
            file && (option.file = join(dir, file));
            return option;  
          }
        : () => output;
      return files.map((input, index) => {
        const file = input.replace(f, '.js');
        return {
          input: joinUtil(T.src, input),
          output: merge({
            file: join(dir, file),
            format: defaultFormat,
            name: conver(input)
          }, getter(index), { sourcemap })
        };
      });
    };
    if(isArray){
      return mapFn();
    } else{
      const { format = defaultFormat } = output;
      if(['iife', 'umd'].includes(format)){
        delete output.file;
        return mapFn();
      } else{
        return [{ 
          input,
          output: merge(output, { dir, sourcemap })
        }];
      }
    }
  }
}

export default (option) => new Rollup(option).option;