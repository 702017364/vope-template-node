import gulp from 'gulp';
import sass from 'gulp-sass';
import compiler from 'node-sass';
import gif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean-css';
import { dest } from '../util';
import { T, P, develop } from '../option';

sass.compiler = compiler;

export default () => gulp
  .src(P.styles.output, { allowEmpty: true })
  .pipe(gif(develop, sourcemaps.init()))
  .pipe(sass({ outputStyle: 'expanded' })).on('errer', sass.logError)
  .pipe(gif(!develop, clean()))
  .pipe(gif(develop, sourcemaps.write('./')))
  .pipe(dest(T.bin) |> gulp.dest);