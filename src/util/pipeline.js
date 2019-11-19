import fs from 'fs';

export default (from, to) => {
  const read = fs.createReadStream(from);
  const write = fs.createWriteStream(to);
  read.pipe(write);
  return new Promise((resolve) => write.on('close', resolve));
};