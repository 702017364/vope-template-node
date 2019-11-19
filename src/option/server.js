import proxy from 'http-proxy-middleware';
import config from './config';
import __transfer from './transfer';
import baseDir from './base';
import merge from 'lodash/merge';

const { browsersync } = config;
const type = typeof browsersync;
const server = { baseDir };
let option = { server };
if(browsersync && type == 'string'){
  const api = proxy('/api', {
    target: browsersync,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    logLevel: 'debug',
  });
  server.middleware = [api];
} else if(browsersync && browsersync == 'object'){
  option = merge(browsersync, option);
}

export default option;