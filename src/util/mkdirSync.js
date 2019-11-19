import fs from 'fs';
import { join } from 'path';
import { sep } from './re'; 

export default (src, to) => {
  src.split(sep).forEach((value) => {
    to = join(to, value);
    fs.existsSync(to) || fs.mkdirSync(to);
  });
  return to;
};