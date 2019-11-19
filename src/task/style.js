import gulp from 'gulp';
import sass from 'gulp-sass';
import compiler from 'node-sass';
import clean from 'gulp-clean-css';
import { Get } from '../util';
import { P, __transfer } from '../option';

sass.compiler = compiler;

class Gett extends Get {
  get src(){
    return P.styles.output;
  }

  get clean(){
    return this.develop
      ? this.empty
      : clean();
  }

  get sass(){
    return sass({ 
      outputStyle: 'expanded',
      includePaths: __transfer,
    }).on('errer', sass.logError);
  }
}

const _ = new Gett();

export default () => gulp
  .src(_.src, _.allowEmpty)
  .pipe(_.sourcemaps_init)
  .pipe(_.sass)
  .pipe(_.clean)
  .pipe(_.sourcemaps_write)
  .pipe(_.dest);