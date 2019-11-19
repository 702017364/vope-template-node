import fs from 'fs';
import { join } from 'path';
import { js } from './re';

export default (src) => {
  const json = join(src, 'package.json');
  if(!fs.existsSync(json)) return;
  const { main, module } = require(json);
  const cache = {};
  module && (cache.module = module);
  main
    && js.test(main)
    && (cache.main = main);
  return cache;
};