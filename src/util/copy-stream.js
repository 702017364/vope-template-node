import { join, dirname } from 'path';
import mkdirSync from './mkdirSync';
import pipeline from './pipeline';

export default (src, from, to) => {
  dirname(src) |> mkdirSync(?, to);
  from = join(from, src);
  to = join(to, src);
  return pipeline(from, to);
};