import { series } from 'gulp';
import clean from './clean';
import style from './style';
import mjs from './mjs';

export default series(
  clean,
  style,
  mjs,
);