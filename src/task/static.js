import gulp from 'gulp';
import { P, T } from '../option';
import { Get } from '../util';

class Gett extends Get {
  get src(){
    return P.static;
  }

  get dest(){
    return this.join(T.dist, T.static) |> gulp.dest;
  }
}

const _ = new Gett();

export default () => {
  return gulp
    .src(_.src, _.allowEmpty)
    .pipe(_.dest)
};