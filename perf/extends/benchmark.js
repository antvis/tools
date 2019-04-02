const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const ES5Cat = require('./es5');
const ES6Cat = require('./es6');
const ES5CatBabel = require('./es6-babel');

const loop = require('./loop');

// add tests
suite
  .add('es5', function() {
    const cat = new ES5Cat('lucy');
    cat.say();
    cat.run();
    cat.getName();
  })
  .add('es6', function() {
    const cat = new ES6Cat('lucy');
    cat.say();
    cat.run();
    cat.getName();
  })
  .add('es6 babel', function() {
    const cat = new ES5CatBabel('lucy');
    cat.say();
    cat.run();
    cat.getName();
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
