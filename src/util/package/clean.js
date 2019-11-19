import { existsSync } from 'fs';
import { join } from 'path';
import cdn from './cdn';
import rmdirSync from '../rmdirSync';

export default (deps, name) => {
  if(name in deps ^ 1) throw new Error(`Not "${name}" package`);
  const value = join(cdn, name);
  existsSync(value) && rmdirSync(value);
};