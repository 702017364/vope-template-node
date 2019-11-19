import { join } from 'path';
import gulp from 'gulp';
import { Get } from '../util';
import { P, T } from '../option';
import { absolute_bin as bin } from '../option/dist';

class Gett extends Get {
  get bin(){
    return join(bin, T.assets);
  }

  get src(){
    return P.assets;
  }

  get dest(){
    return gulp.dest(this.bin);
  }
}

const _ = new Gett();

export default () => {
  return gulp
    .src(_.src, _.allowEmpty)
    .pipe(_.dest);
};