import { join } from 'path';
import { sep } from './re';

/**
 * @description: 将相对路径转换成绝对路径
 * @param {String|Array|Object} src
 * @param {String} path 
 * @return: 返回已转换为绝对路径的值，类型同参数 src
 */
const abs = (src, path) => {
  if(typeof src == 'string'){
    let value;
    if(src.slice(0, 1) == '!'){
      value = src.slice(1)
        |> join(path, ?)
        |> '!'.concat;
    } else{
      value = join(path, src);
    }
    return value.replace(sep, '/');
  } else if(src instanceof Array){
    return src.map((value) => abs(value, path));
  } else{
    const obj = {};
    for(let key in src){
      obj[key] = src[key] |> abs(?, path);
    }
    return obj;
  }
};

export default abs;