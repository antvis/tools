const { extend, augment } = require('../../packages/util/lib');
const loop = require('./loop');

// const Base = function(name) {
//   Base.superclass.constructor.call(this, name);
// };
//
// augment(Base, {
//   getName() {
//     return this.name;
//   }
// });
//
// const Animal = function(name) {
//   this.name = name;
// };
//
// augment(Animal, {
//   say() {
//     loop(1000, () =>`animal say ${this.name}`);
//   },
//
//   run() {
//     loop(1000, () => `animal run ${this.name}`);
//   }
// });

// extend(Animal, Base);

const Cat = function(name) {
  // Cat.superclass.constructor.call(this, name);
  this.name = name;
};

augment(Cat, {
  say() {
    loop(1000, () => `cat say ${this.name}`);
  },

  run() {
    loop(1000, () => `cat run ${this.name}`);
  },
  getName() {
    return this.name;
  }
});

// extend(Cat, Animal, Base);

module.exports = Cat;

// const cat = new Cat('lucy');
//
// cat.say();
// cat.run();
