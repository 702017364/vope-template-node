import watch from 'gulp-watch';
import { Logger } from '../util';
import http from './http';
import { T, server as options, watchs } from '../option';

const re = new RegExp(`([\\\\\\\/])(${T.views}|${T.static}|${T.bin})\\1`, 'i');

export default () => {
  http.init(options);
  return watch(watchs, (vinyl) => {
    const matchs = vinyl.path.match(re);
    const type = matchs ? matchs[2] : 'index.html';
    type
      && type != T.bin
      && Logger.log(new Date(), 'Changed', type, '');
    http.reload();
  });
};