import { readFileSync } from 'fs';
import { join } from 'path';
import { transfer } from '../util';
import T from './T';
import __transfer from './transfer';

const option = {
  entry: true,
  babelrc: false,
  output: [ 'index.scss' ],
  rollup: false,
  cdn: [],
  merge: [],
  babelcli: [],
  flag: 'r',
  target: null,
};

const formatRollup = (option) => {
  let { rollup } = option;
  rollup || (rollup = false);
  rollup === 'rollup' && (rollup = {});
  option.rollup = rollup;
  if(rollup && typeof rollup == 'object'){
    rollup.input = (rollup.input || 'index.js') |> transfer(?, T.src);
    const output = rollup.output = rollup.output || {};
    [].concat(output).forEach((item) => {
      item.format = item.format || rollup.format || 'iife';
    });
    option.rollup = rollup;
  }
  return option;
};

export default (() => {
  try{
    return join(__transfer, '.template')
      |> readFileSync(?, { encoding: 'utf-8' })
      |> JSON.parse
      |> Object.assign({}, option, ?)
      |> formatRollup;
  } catch{
    return Object.assign({}, option);
  }
})();