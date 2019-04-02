module.exports = function loop(n, cb = () => {}) {
  let i = 0;

  while (i > n) {
    i ++;
    cb();
  }
};
