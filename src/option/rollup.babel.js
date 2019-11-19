import babel from 'rollup-plugin-babel';
import config from './config';

const option = {
  exclude: 'node_modules/**',
  babelrc: false,
  runtimeHelpers: true,
  get presets(){
    const presets = [];
    config.env === true && presets.push([
      '@babel/preset-env',
      { modules: false }
    ]);
    return presets.concat(config.presets || []);
  },
  get plugins(){
    const plugins = [];
    config.runtime === true && plugins.push([
      '@babel/plugin-transform-runtime',
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": false,
        "regenerator": true,
        "useESModules": false
      }
    ]);
    return plugins.concat(config.plugins || []);
  },
};

export default () => babel(option);