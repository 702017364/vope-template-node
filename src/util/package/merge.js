import fs from 'fs';
import { config } from '../../option';
import format from './format';
import { join } from 'path';
import cdn from './cdn';

const inspect = (src, value) => {
  if(!fs.existsSync(src)) throw new Error(`Not found '${value}'`);
};

const merge = () => {
  const list = config.merge;
  if(!Array.isArray(list) || !list.length) return;
  return list.map((value) => {
    let src = format(value);
    inspect(src, value);
    if(fs.statSync(src).isDirectory()){
      src = join(src, 'index.js');
    }
    inspect(src, value);
    return src;
  });
};

export default () => {
  const list = merge();
  if(!list) return;
  const path = join(cdn, 'index.js');
  list.forEach((value, index) => {
    index && fs.appendFileSync(path, '\n');
    fs.readFileSync(value, 'utf-8') |> fs.appendFileSync(path, ?);
  });
};