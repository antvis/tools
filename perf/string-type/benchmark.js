const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const CharCode = require('./chat-code');
const Reg = require('./regex');


const groupString = (s, util) => {
  const g = {
    c: 0,
    a: 0.
  };

  for (let i = 0; i < s.length; i ++) {
    if (util.isChinese(s[i])) {
      g.c ++;
    } else if (util.isAlpha(s[i])) {
      g.a ++;
    }
  }

  return g;
};

// add tests
suite
  .add('char-code', function() {
    groupString('hello world, 世界你好！', CharCode);
  })
  .add('regex', function() {
    // groupString('hello world, 世界你好！', Reg);
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
