const {
  assign,
  map,
  toArray,
  toString,
} = require('macaca-utils');
const {
  remote,
} = require('electron');
const remoteConsole = remote.require('console');

// we have to do this so that mocha output doesn't look like shit
// eslint-disable-next-line
console.log = function() {
  remoteConsole.log.apply(remoteConsole, map(toArray(arguments), (arg) => toString(arg)));
};
console.dir = function() {
  remoteConsole.log.apply(remoteConsole, map(toArray(arguments), (arg) => toString(arg)));
};

// if we don't do this, we get socket errors and our tests crash
assign(process, {
  stdout: {
    value: remote.process.stdout,
  },
});
