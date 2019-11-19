import { rmdirSync, join } from '../util';
import { T } from '../option';

export default (cb) => {
  const list = [T.dist];
  list.forEach((value) => {
    try{
      value = join(value) |> rmdirSync;
    } catch{}
  });
  cb();
};