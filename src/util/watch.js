import gulp from 'gulp';
import copy from './copy';
import unlink from './unlink';
import change from './change';

export default (files, to) => {
  const watcher = gulp.watch(files);
  watcher.on('add', (file) => copy(file, to));
  watcher.on('unlink', (file) => unlink(file, to));
  watcher.on('change', (file) => change(file, to));
  return watcher;
};