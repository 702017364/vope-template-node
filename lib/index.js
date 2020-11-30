'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var gulp = require('gulp');
var gulp__default = _interopDefault(gulp);
var path = require('path');
var through2 = _interopDefault(require('through2'));
var sourcemaps = _interopDefault(require('gulp-sourcemaps'));
var merge$2 = _interopDefault(require('lodash/merge'));
var minimist = _interopDefault(require('minimist'));
var proxy = _interopDefault(require('http-proxy-middleware'));
var fs = require('fs');
var fs__default = _interopDefault(fs);
var cli = _interopDefault(require('cli-color'));
var regeneratorRuntime = _interopDefault(require('regenerator-runtime'));
var sass = _interopDefault(require('gulp-sass'));
var compiler = _interopDefault(require('node-sass'));
var clean$2 = _interopDefault(require('gulp-clean-css'));
var rename = _interopDefault(require('gulp-rename'));
var rollup = require('rollup');
var commonjs = _interopDefault(require('rollup-plugin-commonjs'));
var json$1 = _interopDefault(require('rollup-plugin-json'));
var resolve = _interopDefault(require('rollup-plugin-node-resolve'));
var rollupPluginTerser = require('rollup-plugin-terser');
var babel$1 = _interopDefault(require('rollup-plugin-babel'));
var watch$2 = _interopDefault(require('gulp-watch'));
var bs = _interopDefault(require('browser-sync'));

var sep = /\\+/g;

/**
 * @description: 将相对路径转换成绝对路径
 * @param {String|Array|Object} src
 * @param {String} path 
 * @return: 返回已转换为绝对路径的值，类型同参数 src
 */

var abs = function abs(src, path$1) {
  if (typeof src == 'string') {
    var value;

    if (src.slice(0, 1) == '!') {
      var _ref, _src$slice, _path, _join;

      value = (_ref = (_src$slice = src.slice(1), (_join = path.join, _path = path$1, function join(_argPlaceholder) {
        return _join(_path, _argPlaceholder);
      })(_src$slice)), '!'.concat(_ref));
    } else {
      value = path.join(path$1, src);
    }

    return value.replace(sep, '/');
  } else if (src instanceof Array) {
    return src.map(function (value) {
      return abs(value, path$1);
    });
  } else {
    var obj = {};

    for (var key in src) {
      var _src$key, _path2, _abs;

      obj[key] = (_src$key = src[key], (_abs = abs, _path2 = path$1, function abs(_argPlaceholder2) {
        return _abs(_argPlaceholder2, _path2);
      })(_src$key));
    }

    return obj;
  }
};

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var id = 0;

function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}

function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }

  return receiver;
}

var _process$argv$1$split = process.argv[1].split('node_modules'),
    _process$argv$1$split2 = _slicedToArray(_process$argv$1$split, 1),
    transfer = _process$argv$1$split2[0];

var join = (function () {
  for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
    list[_key] = arguments[_key];
  }

  return path.join.apply(void 0, [transfer].concat(list));
});

var transfer$1 = (function (value, key) {
  var _join, _value, _abs;

  return _join = join(key), (_abs = abs, _value = value, function abs(_argPlaceholder) {
    return _abs(_value, _argPlaceholder);
  })(_join);
});

var value = {};

try {
  var _join;

  value = (_join = join('template.js'), require(_join));
} catch (_unused) {
  value = {};
}

var custom = value;

var T = Object.assign({
  bin: 'bin',
  cdn: 'cdn',
  dist: 'dist',
  views: 'views',
  styles: 'styles',
  src: 'src',
  "static": 'static',
  assets: 'assets'
}, custom.dir || {});

var develop = !minimist(process.argv.slice(2)).production;

var relative_bin = path.join(T.dist, T.bin);
var relative_cdn = path.join(T.dist, T.cdn);
var absolute_bin = join(relative_bin);
var absolute_cdn = join(relative_cdn);

var defaultFormat = 'iife';
var re = /\.+[\\\/]+|[-_.]+([0-9a-z])/ig;
var f = /\.\w+$/g;

var conver = function conver(value) {
  var index = value.lastIndexOf('.');
  value = value.slice(0, index);
  return value.replace(re, function ($0, $1) {
    return $1.toLocaleUpperCase();
  });
};

var Rollup = function Rollup(_option) {
  var _this = this,
      _option$rollup;

  _classCallCheck(this, Rollup);

  this.init = function () {
    var rollup = _this.rollup;
    var option = merge$2({}, rollup);
    delete option.input;
    delete option.output;
    delete option.plugins;
    _this.option.rollup = {
      option: option,
      list: _this.formatRollup(rollup && _typeof(rollup) == 'object' ? rollup : {})
    };
  };

  this.formatRollup = function (value) {
    var _merge = merge$2({
      input: 'index.js',
      output: {
        format: defaultFormat
      }
    }, value),
        output = _merge.output,
        input = _merge.input;

    var files = [].concat(input);
    var sourcemap = _this.sourcemap;
    var isArray = Array.isArray(output);

    if (!output || _typeof(output) !== 'object') {
      output = {};
    } else if (isArray && output.length == 1) {
      var _output = output;

      var _output2 = _slicedToArray(_output, 1);

      output = _output2[0];
    }

    var mapFn = function mapFn() {
      var getter = isArray ? function (index) {
        var option = output[index] || {};
        var file = option.file;
        file && (option.file = path.join(absolute_bin, file));
        return option;
      } : function () {
        return output;
      };
      return files.map(function (input, index) {
        var file = input.replace(f, '.js');
        return {
          input: join(T.src, input),
          output: merge$2({
            file: path.join(absolute_bin, file),
            format: defaultFormat,
            name: conver(input)
          }, getter(index), {
            sourcemap: sourcemap
          })
        };
      });
    };

    if (isArray) {
      return mapFn();
    } else {
      var _output3 = output,
          _output3$format = _output3.format,
          format = _output3$format === void 0 ? defaultFormat : _output3$format;

      if (['iife', 'umd'].includes(format)) {
        delete output.file;
        return mapFn();
      } else {
        return [{
          input: input,
          output: merge$2(output, {
            dir: absolute_bin,
            sourcemap: sourcemap
          })
        }];
      }
    }
  };

  this.option = _option;
  this.rollup = (_option$rollup = _option.rollup) !== null && _option$rollup !== void 0 ? _option$rollup : {};
  this.sourcemap = develop || _option.sourcemap === true;
  this.init();
};

var formatRollup = (function (option) {
  return new Rollup(option).option;
});

var _merge;
var option = {
  env: false,
  entry: true,
  base: './',
  runtime: true,
  rename: null,
  output: ['index.scss'],
  cdn: [],
  merge: [],
  rollup: {},
  presets: [],
  plugins: [],
  browsersync: null,
  rules: {},
  uglify: true
};
var config = (_merge = merge$2(option, custom), formatRollup(_merge));

var _ref, _T$assets, _transfer, _watch$output, _T$styles, _transfer2, _ref2, _T$src, _transfer3, _ref3, _T$views, _transfer4, _ref4, _T$static, _transfer5;
var P = {
  assets: (_ref = ['**/*', '!REMADE.md'], (_transfer = transfer$1, _T$assets = T.assets, function transfer(_argPlaceholder) {
    return _transfer(_argPlaceholder, _T$assets);
  })(_ref)),
  styles: (_watch$output = {
    watch: ['**/*.scss', '!REMADE.md'],
    output: config.output
  }, (_transfer2 = transfer$1, _T$styles = T.styles, function transfer(_argPlaceholder2) {
    return _transfer2(_argPlaceholder2, _T$styles);
  })(_watch$output)),
  mjss: (_ref2 = ['**/*.js', '**/*.mjs', '**/*.ts', '!REMADE.md'], (_transfer3 = transfer$1, _T$src = T.src, function transfer(_argPlaceholder3) {
    return _transfer3(_argPlaceholder3, _T$src);
  })(_ref2)),
  views: (_ref3 = ['**/*.html', '**/*.htm', '!REMADE.md'], (_transfer4 = transfer$1, _T$views = T.views, function transfer(_argPlaceholder4) {
    return _transfer4(_argPlaceholder4, _T$views);
  })(_ref3)),
  "static": (_ref4 = ['**/*', '!REMADE.md'], (_transfer5 = transfer$1, _T$static = T["static"], function transfer(_argPlaceholder5) {
    return _transfer5(_argPlaceholder5, _T$static);
  })(_ref4))
};

var root = path.join(__dirname, '../');

var _relative, _T$dist, _join$1;
var base = (_relative = path.relative(root, transfer), (_join$1 = path.join, _T$dist = T.dist, function join(_argPlaceholder) {
  return _join$1(_argPlaceholder, _T$dist);
})(_relative));
var cache = config.base;
var value$1 = typeof cache == 'string' && cache ? path.join(base, cache) : base;
var baseDir = value$1.replace(/\\+/g, '/');

var browsersync = config.browsersync;

var type = _typeof(browsersync);

var server = {
  baseDir: baseDir
};
var option$1 = {
  server: server
};

if (browsersync && type == 'string') {
  var api = proxy('/api', {
    target: browsersync,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    logLevel: 'debug'
  });
  server.middleware = [api];
} else if (browsersync && browsersync == 'object') {
  option$1 = merge$2(browsersync, option$1);
}

var options = option$1;

var watchs = join(T.dist, '**/*');

var allowEmpty = {
  allowEmpty: true
};

var Get =
/*#__PURE__*/
function () {
  function Get() {
    _classCallCheck(this, Get);

    this.join = function () {
      return join.apply(void 0, arguments);
    };
  }

  _createClass(Get, [{
    key: "develop",
    get: function get() {
      return develop;
    }
  }, {
    key: "allowEmpty",
    get: function get() {
      return allowEmpty;
    }
  }, {
    key: "empty",
    get: function get() {
      return through2.obj();
    }
  }, {
    key: "sourcemaps_init",
    get: function get() {
      return develop ? sourcemaps.init() : this.empty;
    }
  }, {
    key: "sourcemaps_write",
    get: function get() {
      return develop ? sourcemaps.write('./') : this.empty;
    }
  }, {
    key: "dest",
    get: function get() {
      return gulp__default.dest(absolute_bin);
    }
  }]);

  return Get;
}();

var rmdirSync = function rmdirSync(src) {
  var stat = fs__default.statSync(src);

  if (stat.isDirectory()) {
    fs__default.readdirSync(src).forEach(function (file) {
      var _join;

      _join = path.join(src, file), rmdirSync(_join);
    });
    fs__default.rmdirSync(src);
  } else {
    fs__default.unlinkSync(src);
  }
};

var mkdirSync = (function (src, to) {
  src.split(sep).forEach(function (value) {
    to = path.join(to, value);
    fs__default.existsSync(to) || fs__default.mkdirSync(to);
  });
  return to;
});

var pipeline = (function (from, to) {
  var read = fs__default.createReadStream(from);
  var write = fs__default.createWriteStream(to);
  read.pipe(write);
  return new Promise(function (resolve) {
    return write.on('close', resolve);
  });
});

var copyStream = (function (src, from, to) {
  var _dirname, _to, _mkdirSync;

  _dirname = path.dirname(src), (_mkdirSync = mkdirSync, _to = to, function mkdirSync(_argPlaceholder) {
    return _mkdirSync(_argPlaceholder, _to);
  })(_dirname);
  from = path.join(from, src);
  to = path.join(to, src);
  return pipeline(from, to);
});

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image';

    _classCallCheck(this, Logger);

    Object.defineProperty(this, _logFinish, {
      value: _logFinish2
    });
    Object.defineProperty(this, _logStart, {
      value: _logStart2
    });
    this.type = type;

    _classPrivateFieldLooseBase(this, _logStart)[_logStart]();
  }

  _createClass(Logger, [{
    key: "then",
    value: function then() {
      _classPrivateFieldLooseBase(this, _logFinish)[_logFinish]();
    }
  }], [{
    key: "log",
    value: function log(time, status, type, other) {
      time = Logger.time(time);
      type = cli.xterm(45)(type);
      console.log("[".concat(time, "] ").concat(status, " '").concat(type, "'").concat(other));
    }
  }, {
    key: "time",
    value: function time(_time) {
      var value = [_time.getHours(), _time.getMinutes(), _time.getSeconds()].map(function (value) {
        return "0".concat(value).slice(-2);
      }).join(':');
      return cli.xterm(8)(value);
    }
  }]);

  return Logger;
}();

var _logStart = _classPrivateFieldLooseKey("logStart");

var _logFinish = _classPrivateFieldLooseKey("logFinish");

var _logStart2 = function _logStart2() {
  var time = this.time = new Date();
  Logger.log(time, 'Starting', this.type, '...');
};

var _logFinish2 = function _logFinish2() {
  var time = new Date();
  var jet = time - this.time;
  var xterm = cli.xterm(56)("".concat(jet, " ms"));
  Logger.log(time, 'Finished', this.type, " after ".concat(xterm));
};

var _id = _classPrivateFieldLooseKey("id");

var _log = _classPrivateFieldLooseKey("log");

var regenerator = regeneratorRuntime;

var clean = (function (deps, name) {
  if (name in deps ^ 1) throw new Error("Not \"".concat(name, "\" package"));
  var value = path.join(absolute_cdn, name);
  fs.existsSync(value) && rmdirSync(value);
});

var cut = /^\/+|\/+$/g;
var js = /\.js$/;
var name = /[^.]+/;
var optim = /^([^\<\>.]*?)(?:\<([^\<\>.]*)\>)?([^\<\>]+)$/;
var has = /[\\\/][^\\\/]*$/;
var alias = /[^\\\/]+$/g;
var isRoot = /^\w+\:[\\\/]+/;

var configurat = (function (basic, list) {
  var cache = {};
  list.forEach(function (value) {
    var _ref, _$, _join;

    var _value$split = value.split('|'),
        _value$split2 = _slicedToArray(_value$split, 2),
        src = _value$split2[0],
        alias$1 = _value$split2[1];

    var matchs = src.match(optim);
    if (!matchs) throw new Error("Wrong format of \"".concat(src, "\""));

    var _matchs$map = matchs.map(function (value, index) {
      return index && (value || '').replace(cut, '');
    }),
        _matchs$map2 = _slicedToArray(_matchs$map, 4),
        $1 = _matchs$map2[1],
        $2 = _matchs$map2[2],
        $3 = _matchs$map2[3];

    var key = (_ref = alias$1 ? $3.replace(alias, alias$1) : $3, (_join = path.join, _$ = $1, function join(_argPlaceholder) {
      return _join(_$, _argPlaceholder);
    })(_ref));
    cache[key] = path.join(basic, $1, $2, $3);
  });
  return cache;
});

var json = (function (src) {
  var json = path.join(src, 'package.json');
  if (!fs__default.existsSync(json)) return;

  var _require = require(json),
      main = _require.main,
      module = _require.module;

  var cache = {};
  module && (cache.module = module);
  main && js.test(main) && (cache.main = main);
  return cache;
});

var format = function format(value) {
  if (!value) return ['./', 'index'];
  var index = value.search(has);
  return ["./".concat(value.slice(0, index)), name.exec(value.slice(index + 1, -3))[0]];
};

var query = (function (basic) {
  var _ref = json(basic) || {},
      main = _ref.main,
      module = _ref.module;

  var _format = format(main),
      _format2 = _slicedToArray(_format, 2),
      dir = _format2[0],
      temp = _format2[1];

  var name = path.join(dir, temp);
  var file;
  ["".concat(name, ".min.js"), "".concat(name, ".js"), main, "".concat(name, ".debug.js"), module].some(function (value) {
    if (!value) return;
    var src = path.join(basic, value);

    if (fs__default.existsSync(src)) {
      file = src;
      return true;
    }
  });
  if (!file) throw new Error('Not found');
  return _defineProperty({}, 'index.js', file);
});

var copyAsync =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(from, to) {
    var files, i, j, file, _join, _from, _pipeline, index, _ref2, _cdn, _mkdirSync, src;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (fs__default.existsSync(from)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            if (!fs__default.statSync(from).isDirectory()) {
              _context.next = 14;
              break;
            }

            files = fs__default.readdirSync(from);
            i = 0, j = files.length;

          case 5:
            if (!(i < j)) {
              _context.next = 12;
              break;
            }

            file = files[i];
            _context.next = 9;
            return copyAsync(path.join(from, file), path.join(to, file));

          case 9:
            i++;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            index = to.search(has);

            if (index > -1) {
              src = to.slice(0, index);
              _ref2 = isRoot.test(src) ? path.relative(transfer, src) : src, (_mkdirSync = mkdirSync, _cdn = absolute_cdn, function mkdirSync(_argPlaceholder) {
                return _mkdirSync(_argPlaceholder, _cdn);
              })(_ref2);
            }

            _context.next = 18;
            return _join = path.join(absolute_cdn, to), (_pipeline = pipeline, _from = from, function pipeline(_argPlaceholder2) {
              return _pipeline(_from, _argPlaceholder2);
            })(_join);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function copyAsync(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var format$1 = (function (value) {
  var _value$slice, _transfer, _join;

  return value.slice(0, 1) == '/' ? (_value$slice = value.slice(1), (_join = path.join, _transfer = transfer, function join(_argPlaceholder) {
    return _join(_transfer, _argPlaceholder);
  })(_value$slice)) : path.join(absolute_cdn, value);
});

var inspect = function inspect(src, value) {
  if (!fs__default.existsSync(src)) throw new Error("Not found '".concat(value, "'"));
};

var merge = function merge() {
  var list = config.merge;
  if (!Array.isArray(list) || !list.length) return;
  return list.map(function (value) {
    var src = format$1(value);
    inspect(src, value);

    if (fs__default.statSync(src).isDirectory()) {
      src = path.join(src, 'index.js');
    }

    inspect(src, value);
    return src;
  });
};

var merge$1 = (function () {
  var list = merge();
  if (!list) return;
  var path$1 = path.join(absolute_cdn, 'index.js');
  list.forEach(function (value, index) {
    var _fs$readFileSync, _path, _fs$appendFileSync, _fs;

    index && fs__default.appendFileSync(path$1, '\n');
    _fs$readFileSync = fs__default.readFileSync(value, 'utf-8'), (_fs = fs__default, _fs$appendFileSync = _fs.appendFileSync, _path = path$1, function appendFileSync(_argPlaceholder) {
      return _fs$appendFileSync.call(_fs, _path, _argPlaceholder);
    })(_fs$readFileSync);
  });
});

var deps = {
  get value() {
    var _join;

    var _ref = (_join = join('package.json'), require(_join)),
        dependencies = _ref.dependencies,
        devDependencies = _ref.devDependencies;

    return Object.assign({}, dependencies, devDependencies);
  }

};
var deps$1 = deps.value;

var custom$1 = Object.assign({
  'element-ui': [//2.x
  '<lib/>index.js', '<lib/theme-chalk/>index.css', '<lib/theme-chalk/>fonts'],
  'bootstrap': [//4.x
  '<dist/js/>bootstrap.min.js|index.js', '<dist/css/>bootstrap.min.css|index.css'],
  'layui-src': [//2.x
  '<dist/>layui.js|index.js', '<dist/>lay', '<dist/>css', '<dist/>font', '<dist/>font', '<dist/>images'],
  'promise-polyfill': ['<dist/>polyfill.min.js|index.js'],
  'chroma-js': [//2.0.x
  'chroma.min.js|index.js']
}, config.rules || {});

var Util =
/*#__PURE__*/
function () {
  function Util(list) {
    _classCallCheck(this, Util);

    this.list = list;
  }

  _createClass(Util, [{
    key: "then",
    value: function () {
      var _then = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee() {
        var list, i, j, value, cache, basic, option, log, key, _cache;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mkdirSync(absolute_cdn, './');
                list = this.list;
                i = 0, j = list.length;

              case 3:
                if (!(i < j)) {
                  _context.next = 22;
                  break;
                }

                value = list[i];
                clean(deps$1, value);
                cache = custom$1 === null || custom$1 === void 0 ? void 0 : custom$1[value];
                basic = join('node_modules', value);
                option = cache ? configurat(basic, cache) : query(basic);
                log = new Logger(value);
                _context.t0 = regenerator.keys(option);

              case 11:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 18;
                  break;
                }

                key = _context.t1.value;
                _cache = path.join(value, key);
                _context.next = 16;
                return copyAsync(option[key], _cache);

              case 16:
                _context.next = 11;
                break;

              case 18:
                log.then();

              case 19:
                i++;
                _context.next = 3;
                break;

              case 22:
                merge$1();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function then() {
        return _then.apply(this, arguments);
      }

      return then;
    }()
  }]);

  return Util;
}();

var copyPackage = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee2(list) {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Util(list).then();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

var clean$1 = (function (cb) {
  var list = [T.dist];
  list.forEach(function (value) {
    try {
      var _join;

      value = (_join = join(value), rmdirSync(_join));
    } catch (_unused) {}
  });
  cb();
});

sass.compiler = compiler;

var Gett =
/*#__PURE__*/
function (_Get) {
  _inherits(Gett, _Get);

  function Gett() {
    _classCallCheck(this, Gett);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gett).apply(this, arguments));
  }

  _createClass(Gett, [{
    key: "src",
    get: function get() {
      return P.styles.output;
    }
  }, {
    key: "clean",
    get: function get() {
      return this.develop || !config.uglify ? this.empty : clean$2();
    }
  }, {
    key: "sass",
    get: function get() {
      return sass({
        outputStyle: 'expanded',
        includePaths: transfer
      }).on('errer', sass.logError);
    }
  }, {
    key: "rename",
    get: function get() {
      var name = config.rename;

      var type = _typeof(name);

      if (type == 'string' && name) {
        return rename("".concat(name, ".css"));
      } else if (name == 'function') {
        return rename;
      } else {
        return this.empty;
      }
    }
  }]);

  return Gett;
}(Get);

var _ = new Gett();

var style = (function () {
  return gulp__default.src(_.src, _.allowEmpty).pipe(_.sourcemaps_init).pipe(_.sass).pipe(_.clean).pipe(_.rename).pipe(_.sourcemaps_write).pipe(_.dest);
});

var option$2 = {
  exclude: 'node_modules/**',
  babelrc: false,
  runtimeHelpers: true,

  get presets() {
    var presets = [];
    config.env === true && presets.push(['@babel/preset-env', {
      modules: false
    }]);
    return presets.concat(config.presets || []);
  },

  get plugins() {
    var plugins = [];
    config.runtime === true && plugins.push(['@babel/plugin-transform-runtime', {
      "absoluteRuntime": false,
      "corejs": false,
      "helpers": false,
      "regenerator": true,
      "useESModules": false
    }]);
    return plugins.concat(config.plugins || []);
  }

};
var babel = (function () {
  return babel$1(option$2);
});

var rollupPlugins = config.rollupPlugins;
var plugins = [];
plugins.push(babel(), resolve({
  customResolveOptions: {
    moduleDirectory: 'node_modules'
  }
}), commonjs(), json$1());
!develop && config.uglify && plugins.push(rollupPluginTerser.terser());

if (Array.isArray(rollupPlugins)) {
  rollupPlugins.forEach(function (item, index) {
    return item && item.name && plugins.splice(index, 1, item);
  });
}

var mjs = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regenerator.mark(function _callee() {
  var _config$rollup, option, list, i, j, _list$i, input, output, cache, bundle;

  return regenerator.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _config$rollup = config.rollup, option = _config$rollup.option, list = _config$rollup.list;
          i = 0, j = list.length;

        case 2:
          if (!(i < j)) {
            _context.next = 13;
            break;
          }

          _list$i = list[i], input = _list$i.input, output = _list$i.output;
          cache = merge$2({}, option, {
            input: input,
            plugins: plugins
          });
          _context.next = 7;
          return rollup.rollup(cache);

        case 7:
          bundle = _context.sent;
          _context.next = 10;
          return bundle.write(output);

        case 10:
          i++;
          _context.next = 2;
          break;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

var Gett$1 =
/*#__PURE__*/
function (_Get) {
  _inherits(Gett, _Get);

  function Gett() {
    _classCallCheck(this, Gett);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gett).apply(this, arguments));
  }

  _createClass(Gett, [{
    key: "bin",
    get: function get() {
      return path.join(absolute_bin, T.assets);
    }
  }, {
    key: "src",
    get: function get() {
      return P.assets;
    }
  }, {
    key: "dest",
    get: function get() {
      return gulp__default.dest(this.bin);
    }
  }]);

  return Gett;
}(Get);

var _$1 = new Gett$1();

var assets = (function () {
  return gulp__default.src(_$1.src, _$1.allowEmpty).pipe(_$1.dest);
});

var cdn = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(cb) {
    var cdn;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cdn = config.cdn;
            _context.t0 = cdn && cdn.length;

            if (!_context.t0) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return copyPackage(cdn);

          case 5:
            cb();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

var Gett$2 =
/*#__PURE__*/
function (_Get) {
  _inherits(Gett, _Get);

  function Gett() {
    _classCallCheck(this, Gett);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gett).apply(this, arguments));
  }

  _createClass(Gett, [{
    key: "src",
    get: function get() {
      return P["static"];
    }
  }, {
    key: "dest",
    get: function get() {
      var _this$join;

      return _this$join = this.join(T.dist, T["static"]), gulp__default.dest(_this$join);
    }
  }]);

  return Gett;
}(Get);

var _$2 = new Gett$2();

var statics = (function () {
  return gulp__default.src(_$2.src, _$2.allowEmpty).pipe(_$2.dest);
});

var Gett$3 =
/*#__PURE__*/
function (_Get) {
  _inherits(Gett, _Get);

  function Gett() {
    _classCallCheck(this, Gett);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gett).apply(this, arguments));
  }

  _createClass(Gett, [{
    key: "views",
    get: function get() {
      return P.views;
    }
  }, {
    key: "entry",
    get: function get() {
      return this.join('index.html');
    }
  }, {
    key: "dest1",
    get: function get() {
      var _join;

      return _join = path.join(transfer, T.dist, T.views), gulp__default.dest(_join);
    }
  }, {
    key: "dest2",
    get: function get() {
      var _this$join;

      return _this$join = this.join(T.dist), gulp__default.dest(_this$join);
    }
  }]);

  return Gett;
}(Get);

var _$3 = new Gett$3();

var views = (function (cb) {
  gulp__default.src(_$3.views, _$3.allowEmpty).pipe(_$3.dest1);
  config.entry && gulp__default.src(_$3.entry).pipe(_$3.dest2);
  return cb();
});

var http = bs.create();

var re$1 = new RegExp("([\\\\\\/])(".concat(T.views, "|").concat(T["static"], "|").concat(T.bin, ")\\1"), 'i');
var server$1 = (function () {
  http.init(options);
  return watch$2(watchs, function (vinyl) {
    var matchs = vinyl.path.match(re$1);
    var type = matchs ? matchs[2] : 'index.html';
    type && type != T.bin && Logger.log(new Date(), 'Changed', type, '');
    http.reload();
  });
});

var copy = (function (from, to) {
  var _relative, _transfer, _to, _copyStream;

  _relative = path.relative(transfer, from), (_copyStream = copyStream, _transfer = transfer, _to = to, function copyStream(_argPlaceholder) {
    return _copyStream(_argPlaceholder, _transfer, _to);
  })(_relative);
});

var unlink = (function (from, to) {
  var _ref, _relative, _to, _join;

  _ref = (_relative = path.relative(transfer, from), (_join = path.join, _to = to, function join(_argPlaceholder) {
    return _join(_to, _argPlaceholder);
  })(_relative)), fs.unlinkSync(_ref);
});

var change = (function (from, to) {
  unlink(from, to);
  copy(from, to);
});

var watch = (function (files, to) {
  var watcher = gulp__default.watch(files);
  watcher.on('add', function (file) {
    return copy(file, to);
  });
  watcher.on('unlink', function (file) {
    return unlink(file, to);
  });
  watcher.on('change', function (file) {
    return change(file, to);
  });
  return watcher;
});

var dist = join(T.dist);
var watch$1 = develop ? gulp__default.parallel([server$1, function () {
  var _gulp$series, _P$styles$watch, _gulp$watch, _gulp;

  return _gulp$series = gulp__default.series(style), (_gulp = gulp__default, _gulp$watch = _gulp.watch, _P$styles$watch = P.styles.watch, function watch(_argPlaceholder) {
    return _gulp$watch.call(_gulp, _P$styles$watch, _argPlaceholder);
  })(_gulp$series);
}, function () {
  var _gulp$series2, _P$mjss, _gulp$watch2, _gulp2;

  return _gulp$series2 = gulp__default.series(mjs), (_gulp2 = gulp__default, _gulp$watch2 = _gulp2.watch, _P$mjss = P.mjss, function watch(_argPlaceholder2) {
    return _gulp$watch2.call(_gulp2, _P$mjss, _argPlaceholder2);
  })(_gulp$series2);
}, function () {
  return watch(P.assets, absolute_bin);
}, function () {
  return watch(P["static"], dist);
}, function () {
  return watch(P.views, dist);
}, function (cb) {
  var _join, _dist, _watch;

  if (config.entry === false) return cb();
  return _join = join('index.html'), (_watch = watch, _dist = dist, function watch(_argPlaceholder3) {
    return _watch(_argPlaceholder3, _dist);
  })(_join);
}]) : function (cb) {
  return cb();
};

var task = gulp.series(clean$1, style, mjs, assets, cdn, statics, views, watch$1);

gulp__default.task('default', task);
