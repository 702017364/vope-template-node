import fs from 'fs';
import { join } from 'path';

const rmdirSync = (src) => {
  const stat = fs.statSync(src);
  if(stat.isDirectory()){
    fs.readdirSync(src).forEach((file) => {
      join(src, file) |> rmdirSync;
    });
    fs.rmdirSync(src);
  } else{
    fs.unlinkSync(src);
  }
}

export default rmdirSync;