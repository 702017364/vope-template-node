import join from '../util/join';
import formatRollup from './rollup';

const option = {
  env: false,
  entry: true,
  base: "./",
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

export default (() => {
  let value;
  try{
    value = join('template.js')
      |> require
      |> Object.assign({}, option, ?);
  } catch{
    value = Object.assign({}, option);
  }
  return formatRollup(value);
})();