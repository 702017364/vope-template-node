import { join } from 'path';
import { optim, cut, alias as re_alias } from './re';

export default (basic, list) => {
  const cache = {};
  list.forEach((value) => {
    const [ src, alias ] = value.split('|');
    const matchs = src.match(optim);
    if(!matchs) throw new Error(`Wrong format of "${src}"`);
    const [ , $1, $2, $3 ] = matchs.map((value, index) => index && (value || '').replace(cut, ''));
    const key = (alias ? $3.replace(re_alias, alias) : $3) |> join($1, ?);
    cache[key] = join(basic, $1, $2, $3);
  });
  return cache;
};