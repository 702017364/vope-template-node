import gulp from 'gulp';
import { develop, P, T, config } from '../option';
import server from './server';
import style from './style';
import mjs from './mjs';
import watch from '../util/watch';
import { absolute_bin as bin } from '../option/dist';
import { join } from '../util';

const dist = join(T.dist);

export default develop
  ? gulp.parallel([
      server,
      () => gulp.series(style) |> gulp.watch(P.styles.watch, ?),
      () => gulp.series(mjs) |> gulp.watch(P.mjss, ?),
      () => watch(P.assets, bin),
      () => watch(P.static, dist),
      () => watch(P.views, dist),
      (cb) => {
        if(config.entry === false) return cb();
        return join('index.html') |> watch(?, dist);
      },
    ])
  : (cb) => cb();