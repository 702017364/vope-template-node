import merge from 'lodash/merge';
import formatRollup from './rollup';
import custom from './custom';

const option = {
  env: false,
  entry: true,
  base: './',
  runtime: true,
  output: [ 'index.scss' ],
  cdn: [],
  merge: [],
  rollup: {},
  presets: [],
  plugins: [],
  browsersync: null,
  rules: {},
};

export default merge(option, custom) |> formatRollup;