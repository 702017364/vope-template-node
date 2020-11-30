import merge from 'lodash/merge';
import formatRollup from './rollup';
import custom from './custom';

const option = {
  env: false,
  entry: true,
  base: './',
  runtime: true,
  rename: null,
  output: [ 'index.scss' ],
  cdn: [],
  merge: [],
  rollup: {},
  presets: [],
  plugins: [],
  browsersync: null,
  rules: {},
  uglify: true,
};

export default merge(option, custom) |> formatRollup;