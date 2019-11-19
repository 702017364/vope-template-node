import { join } from 'path';
import gulp from 'gulp';
import { P, __transfer, T, config } from '../option';
import { Get } from '../util';

class Gett extends Get {
  get views(){
    return P.views;
  }

  get entry(){
    return this.join('index.html');
  }

  get dest1(){
    return join(__transfer, T.dist, T.views) |> gulp.dest;
  }

  get dest2(){
    return this.join(T.dist) |> gulp.dest;
  }
}

const _ = new Gett();

export default (cb) => {
  gulp
    .src(_.views, _.allowEmpty)
    .pipe(_.dest1);
  config.entry && gulp
    .src(_.entry)
    .pipe(_.dest2);
  return cb();
};