import transfer from '../util/transfer';
import T from './T';
import config from './config';

export default {
  assets: [
    '**/*',
    '!REMADE.md',
  ] |> transfer(?, T.assets),
  styles: {
    watch: ['**/*.scss', '!REMADE.md'],
    output: config.output,
  } |> transfer(?, T.styles),
  mjss: [
    '**/*.js',
    '**/*.mjs',
    '**/*.ts',
    '!REMADE.md',
  ] |> transfer(?, T.src),
  views: [
    '**/*.html',
    '**/*.htm',
    '!REMADE.md',
  ] |> transfer(?, T.views),
  static: [
    '**/*',
    '!REMADE.md',
  ] |> transfer(?, T.static),
};