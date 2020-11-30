import gulp from 'gulp';
import sass from 'gulp-sass';
import compiler from 'node-sass';
import clean from 'gulp-clean-css';
import rename from 'gulp-rename';
import { Get } from '../util';
import { P, __transfer, config } from '../option';

sass.compiler = compiler;

class Gett extends Get {
  get src(){
    return P.styles.output;
  }

  get clean(){
    return this.develop || !config.uglify
      ? this.empty
      : clean();
  }

  get sass(){
    return sass({ 
      outputStyle: 'expanded',
      includePaths: __transfer,
    }).on('errer', sass.logError);
  }

  get rename(){
    const name = config.rename;
    const type = typeof name;
    if(type == 'string' && name){
      return rename(`${name}.css`);
    } else if(name == 'function'){
      return rename;
    } else{
      return this.empty;
    }
  }
}

const _ = new Gett();

export default () => gulp
  .src(_.src, _.allowEmpty)
  .pipe(_.sourcemaps_init)
  .pipe(_.sass)
  .pipe(_.clean)
  .pipe(_.rename)
  .pipe(_.sourcemaps_write)
  .pipe(_.dest);