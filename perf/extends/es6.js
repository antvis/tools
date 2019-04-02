const loop = require('./loop');

class Base {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Animal extends Base {
  constructor(name) {
    super(name);
  }

  say() {
    loop(1000, () => `animal say ${this.name}`);
  }

  run() {
    loop(1000, () => `animal run ${this.name}`);
  }
}


class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  say() {
    loop(1000, () => `cat say ${this.name}`);
  }

  run() {
    loop(1000, () => `cat run ${this.name}`);
  }
}

// const cat = new Cat('lucy');
//
// cat.say();
// cat.run();


module.exports = Cat;
