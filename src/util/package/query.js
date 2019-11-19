import fs from 'fs';
import json from './json';
import { has, name } from './re';
import { join } from 'path';

const format = (value) => {
  if(!value) return ['./', 'index'];
  const index = value.search(has);
  return [
    `./${value.slice(0, index)}`,
    name.exec(value.slice(index + 1, -3))[0]
  ];
};

export default (basic) => {
  const { main, module } = json(basic) || {};
  const [ dir, temp ] = format(main);
  const name = join(dir, temp);
  let file;
  [
    `${name}.min.js`,
    `${name}.js`,
    main,
    `${name}.debug.js`,
    module,
  ].some((value) => {
    if(!value) return;
    const src = join(basic, value);
    if(fs.existsSync(src)){
      file = src;
      return true;
    }
  });
  if(!file) throw new Error('Not found');
  return {
    ['index.js']: file
  };
};