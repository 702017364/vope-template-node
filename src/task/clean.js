import { statSync } from 'fs';
import { join } from 'path';
import gulp from 'gulp';
import clean from 'gulp-clean';
import { __transfer, T, develop } from '../option';

export default (cb) => {
  const list = [];
  const push = (folder) => {
    const src = join(__transfer, folder);
    try{
      statSync(src);
      list.push(src);
    } catch{}
  };
  develop && push(T.bin);
  develop && push(T.cdn);
  develop || push(T.dist);
  return list.length
    ? gulp.src(list, { allowEmpty: true }).pipe(clean())
    : cb();
};