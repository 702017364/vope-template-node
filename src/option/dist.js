import { join } from 'path';
import joinUtil from '../util/join';
import T from './T';

export const relative_bin = join(T.dist, T.bin);

export const relative_cdn = join(T.dist, T.cdn);

export const absolute_bin = joinUtil(relative_bin);

export const absolute_cdn = joinUtil(relative_cdn);