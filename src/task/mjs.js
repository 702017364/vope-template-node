import { rollup } from 'rollup';
import merge from 'lodash/merge';
import { config } from '../option';
import plugins from '../option/rollup.plugins';

export default async () => {
  const { option, list } = config.rollup;
  for(let i = 0, j = list.length; i < j; i++){
    const { input, output } = list[i];
    const cache = merge({}, option, { input, plugins });
    const bundle = await rollup(cache);
    await bundle.write(output);
  }
};