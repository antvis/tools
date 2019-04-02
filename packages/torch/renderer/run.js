const {
  resolve,
  dirname,
} = require('path');
const mocha = require('mocha');
const {
  writeFileSync,
} = require('fs');
const {
  mkdir,
} = require('macaca-utils');
const {
  ipcRenderer,
  remote,
} = require('electron');
// require('electron-cookies');
const notify = require('../lib/notify');
const Coverage = require('../lib/coverage');
const runMocha = require('../lib/runMocha');
const remoteConsole = remote.require('console');

let opts = {};

if (window.location.hash) {
  const hash = window.location.hash.slice(1);
  opts = JSON.parse(decodeURIComponent(hash));
}

if (opts.interactive) {
  const pkg = require('../package');
  // eslint-disable-next-line
  console.log(`${pkg.name}(${pkg.version}) run with protocol '${window.location.protocol}'`);
} else {
  require('./console');
}

let coverage;
if (opts.coverage) {
  try {
    coverage = new Coverage(opts.root, opts.sourcePattern);
  } catch (e) {
    remoteConsole.error(e);
  }
}

// Expose mocha
window.mocha = mocha;

function reportError({
  message,
  stack,
}) {
  if (opts.interactive) {
    console.error(message);
    console.error(stack);
  } else {
    ipcRenderer.send('mocha-error', {
      message,
      stack,
    });
  }
}

// TODO compile
if (opts.compile) {
  require('../lib/requireHook')(opts.compileOpts);
}

ipcRenderer.on('mocha-start', () => {
  try {
    runMocha(opts, (count) => {
      if (count && opts.notifyOnFail) {
        notify(count);
      }
      if (coverage) {
        try {
          coverage.report();
        } catch (e) {
          remoteConsole.error(e);
        }
      }
      ipcRenderer.send('mocha-done', count);
    });
  } catch (error) {
    reportError(error);
  }
});

// Request re-run on reload in --interactive mode
ipcRenderer.send('mocha-ready-to-run');

// Expose Macaca inject utils
const queue = [];

window.Macaca = {
  screenshot: (options, callback) => {
    queue.push({
      options,
      callback,
    });
    ipcRenderer.send('screenshot-start', options);
  },
};

if (opts.interactive) {
  // eslint-disable-next-line
  console.log('global utils', window.Macaca);
}

ipcRenderer.on('screenshot-end', (e, data) => {
  const target = queue.shift();

  if (target) {
    if (target.options && target.options.directory) {
      const directory = resolve(target.options.directory);
      mkdir(dirname(directory));
      // eslint-disable-next-line
      console.log(`screenshot was saved to ${directory}`);
      writeFileSync(directory, data.base64, 'base64');
    }

    target.callback({
      action: 'screenshot',
      data,
    });
  }
});
