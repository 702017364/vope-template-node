import root from './root';
import { relative, join } from 'path';
import __transfer from './transfer';
import config from './config';
import T from './T';

const base = relative(root, __transfer) |> join(?, T.dist);
const { base: cache } = config;

const value = typeof cache == 'string' && cache
  ? join(base, cache)
  : base;

export default value.replace(/\\+/g, '/');