import { config } from '../../option';

export default Object.assign({
  'element-ui': [ //2.x
    '<lib/>index.js',
    '<lib/theme-chalk/>index.css',
    '<lib/theme-chalk/>fonts',
  ],
  'bootstrap': [ //4.x
    '<dist/js/>bootstrap.min.js|index.js',
    '<dist/css/>bootstrap.min.css|index.css'
  ],
  'layui-src': [ //2.x
    '<dist/>layui.js|index.js',
    '<dist/>lay',
    '<dist/>css',
    '<dist/>font',
    '<dist/>font',
    '<dist/>images',
  ],
  'promise-polyfill': [
    '<dist/>polyfill.min.js|index.js'
  ],
  'chroma-js': [ //2.0.x
    'chroma.min.js|index.js',
  ],
}, config.rules || {});