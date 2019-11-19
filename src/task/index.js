import { series } from 'gulp';
import clean from './clean';
import style from './style';
import mjs from './mjs';
import assets from './assets';
import cdn from './cdn';
import statics from './static';
import views from './views';
import watch from './watch';

export default series(
  clean,
  style,
  mjs,
  assets,
  cdn,
  statics,
  views,
  watch,
);