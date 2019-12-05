import custom from './custom';

export default Object.assign({
  bin: 'bin',
  cdn: 'cdn',
  dist: 'dist',
  views: 'views',
  styles: 'styles',
  src: 'src',
  static: 'static',
  assets: 'assets',
}, custom.dir || {});