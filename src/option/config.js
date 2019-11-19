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
  rollup: null,
  presets: [],
  plugins: [],
  browsersync: null,
  rules: {},
};

export default (() => {
  try{
    return join('template.js')
      |> require
      |> Object.assign({}, option, ?)
      |> formatRollup;
  } catch{
    return Object.assign({}, option);
  }
})();