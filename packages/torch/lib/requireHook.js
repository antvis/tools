/* eslint node/no-deprecated-api: 0 */

const minimatch = require('minimatch');
const sourceMapSupport = require('source-map-support');
const babelIstanbulPlugin = require('babel-plugin-istanbul').default;
const ts = require('typescript');
const less = require('less');
const {
  readFileSync
} = require('fs');
const {
  dirname,
  extname,
  relative
  // resolve
} = require('path');
const {
  OptionManager,
  transform
} = require('@babel/core');
const {
  assign,
  extend,
  uniq,
  some
} = require('macaca-utils');

let oldHandlers = {};
const maps = {};
const cwd = process.cwd();

sourceMapSupport.install({
  handleUncaughtExceptions: false,
  environment: 'node',
  retrieveSourceMap(source) {
    const map = maps && maps[source];
    if (map) {
      return {
        url: null,
        map
      };
    }
    return null;

  }
});

const babelrc = {};
const tsconfig = {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    importHelpers: true, // 移除extends编译结果，提高coverage
  },
};

function compile(filename) {
  let source = readFileSync(filename, 'utf8');
  const originSrc = source;

  if (extname(filename) === '.css') {
    const style = document.createElement('style');
    style.innerHTML = source;
    document.head.appendChild(style);
    return '';
  }

  if (extname(filename) === '.less') {
    less.render(source, { async: true }, function(error, output) {
      if (error) {
        console.log('less error: ', error);
      }
      const style = document.createElement('style');
      style.innerHTML = output.css;
      document.head.appendChild(style);
    });
    return '';
  }

  if (extname(filename) === '.svg') {
    source = `export default \`${source}\``;
  }

  // // 先经过 ts 处理
  const transpiled = ts.transpileModule(source, tsconfig);
  source = transpiled.outputText;
  // console.log(source, originSrc);

  // merge in base options and resolve all the plugins and presets relative to this file
  babelrc.plugins = babelrc.plugins || [];
  babelrc.plugins.push(babelIstanbulPlugin);
  babelrc.plugins = uniq(babelrc.plugins);
  const transformOpts = new OptionManager().init(assign({}, babelrc, {
    sourceRoot: dirname(filename),
    filename
  }));
  const transformed = transform(source, transformOpts);
  return transformed.code;
}

function loader(m, filename) {
  m._compile(compile(filename), filename);
}

function isMatching(filename, patterns) {
  return some(patterns, pattern => {
    const result = minimatch(filename, pattern, {
      dot: true
    });
    return result;
  });
}

function shouldIgnore(filename, include, exclude) {
  const relativeFilename = relative(cwd, filename);
  if (include.length === 0) {
    return isMatching(relativeFilename, exclude);
  }
  if (exclude.length === 0) {
    return !isMatching(relativeFilename, include);
  }
  
  if (isMatching(relativeFilename, include)) {
    // 已经在 include 中的，默认强行不显示，这个默认规则与 webpack 的规则对齐：https://github.com/prettier/prettier/issues/1358
    return false; 
  }
  if (isMatching(relativeFilename, exclude)) {
    return true;
  }
  return !isMatching(relativeFilename, include) || isMatching(relativeFilename, exclude);
}

function registerExtension(ext, options) {
  const old = oldHandlers[ext] || oldHandlers['.js'] || require.extensions['.js'];
  const {
    include = [],
    exclude = []
  } = options;

  require.extensions[ext] = (m, filename) => {
    // ignore
    if (shouldIgnore(filename, include, exclude)) {
      old(m, filename);
    } else {
      loader(m, filename, old);
    }
  };
}

function hookExtensions(_exts, options) {
  Object.keys(oldHandlers).forEach(function(ext) {
    const old = oldHandlers[ext];
    if (old === undefined) {
      delete require.extensions[ext];
    } else {
      require.extensions[ext] = old;
    }
  });

  oldHandlers = {};

  _exts.forEach(function(ext) {
    oldHandlers[ext] = require.extensions[ext];
    registerExtension(ext, options);
  });
}

module.exports = (options = {}) => {
  extend(babelrc, options.babelrc);
  extend(tsconfig, options.tsconfig);
  hookExtensions(options.extensions, options);
};
