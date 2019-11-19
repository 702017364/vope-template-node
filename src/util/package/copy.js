import fs from 'fs';
import { join, relative } from 'path';
import { has, isRoot } from './re';
import mkdirSync from '../mkdirSync';
import cdn from './cdn';
import pipeline from '../pipeline';
import { __transfer } from '../../option';

const copyAsync = async (from, to) => {
  if(!fs.existsSync(from)) return;
  if(fs.statSync(from).isDirectory()){
    const files = fs.readdirSync(from);
    for(let i = 0, j = files.length; i < j; i++){
      const file = files[i];
      await copyAsync(
        join(from, file),
        join(to, file)
      );
    }
  } else{
    const index = to.search(has);
    if(index > -1){
      const src = to.slice(0, index);
      (
        isRoot.test(src)
          ? relative(__transfer, src)
          : src
      ) |> mkdirSync(?, cdn);
    }
    await (join(cdn, to) |> pipeline(from, ?));
  }
};

export default copyAsync;