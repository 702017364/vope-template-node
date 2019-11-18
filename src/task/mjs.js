import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify-es';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rollup from 'gulp-rollup';
import through2 from 'through2';
import { config, P, T, develop, plugins } from '../option';
import { dest } from '../util';

const _ = {
  get cache(){
    return config.rollup;
  },
  get empty(){
    return through2.obj();
  },
  get rollup(){
    const { cache } = this;
    return typeof cache == 'object'
      ? rollup(cahce)
      : this.empty;
  },
  get plumber(){
    return plumber({
      errorHandler: notify.onError('<%= error.message %>')
    });
  },
  get sourcemaps_init(){
    return develop 
      ? sourcemaps.init()
      : this.empty;
  },
  get babel(){
    return babel({
      babelrc: config.babelrc,
      plugins,
    });
  },
  get uglify(){
    return develop
      ? this.empty
      : uglify();
  },
  get sourcemaps_write(){
    return develop
      ? sourcemaps.write('./')
      : this.empty;
  },
  get dest(){
    return dest(T.bin) |> gulp.dest;
  },
};

export default () => {
  return gulp
    .src(P.mjss, { allowEmpty: true })
    .pipe(_.plumber)
    .pipe(_.sourcemaps_init)
    .pipe(_.babel)
    .pipe(_.rollup)
    .pipe(_.uglify)
    .pipe(_.sourcemaps_write)
    .pipe(_.dest);
};