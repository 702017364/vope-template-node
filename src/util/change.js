import unlink from './unlink';
import copy from './copy';

export default (from, to) => {
  unlink(from, to);
  copy(from, to);
};