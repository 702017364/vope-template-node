import { join } from 'path';
import mkdirSync from '../mkdirSync';
import cdn from './cdn';
import clean from './clean';
import joinUtil from '../join';
import configurat from './configurat';
import query from './query';
import Logger from '../logger';
import copy from './copy';
import merge from './merge';
import deps from './deps';
import custom from './custom';

class Util {
  constructor(list){
    this.list = list;
  }

  async then(){
    mkdirSync(cdn, './');
    const { list } = this;
    for(let i = 0, j = list.length; i < j; i++){
      const value = list[i];
      clean(deps, value);
      const cache = custom?.[value];
      const basic = joinUtil('node_modules', value);
      const option = cache
        ? configurat(basic, cache)
        : query(basic);
      const log = new Logger(value);
      for(let key in option){
        const cache = join(value, key);
        await copy(option[key], cache);
      }
      log.then();
    }
    merge();
  }
}

export default async (list) => await new Util(list).then();