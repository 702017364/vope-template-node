import gulp from 'gulp';
import through2 from 'through2';
import sourcemaps from 'gulp-sourcemaps';
import { develop } from '../option';
import join from './join';
import { absolute_bin as bin } from '../option/dist';

const allowEmpty = { allowEmpty: true };

export default class Get {
  join = (...list) => join(...list)

  get develop(){
    return develop;
  }

  get allowEmpty(){
    return allowEmpty;
  }
  
  get empty(){
    return through2.obj();
  }

  get sourcemaps_init(){
    return develop
      ? sourcemaps.init()
      : this.empty;
  }

  get sourcemaps_write(){
    return develop
      ? sourcemaps.write('./')
      : this.empty;
  }

  get dest(){
    return gulp.dest(bin);
  }
}