'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loop = require('./loop');

var Base = function () {
  function Base(name) {
    _classCallCheck(this, Base);

    this.name = name;
  }

  _createClass(Base, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);

  return Base;
}();

var Animal = function (_Base) {
  _inherits(Animal, _Base);

  function Animal(name) {
    _classCallCheck(this, Animal);

    return _possibleConstructorReturn(this, (Animal.__proto__ || Object.getPrototypeOf(Animal)).call(this, name));
  }

  _createClass(Animal, [{
    key: 'say',
    value: function say() {
      var _this2 = this;

      loop(1000, function () {
        return 'animal say ' + _this2.name;
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this3 = this;

      loop(1000, function () {
        return 'animal run ' + _this3.name;
      });
    }
  }]);

  return Animal;
}(Base);

var Cat = function (_Animal) {
  _inherits(Cat, _Animal);

  function Cat(name) {
    _classCallCheck(this, Cat);

    return _possibleConstructorReturn(this, (Cat.__proto__ || Object.getPrototypeOf(Cat)).call(this, name));
  }

  _createClass(Cat, [{
    key: 'say',
    value: function say() {
      var _this5 = this;

      loop(1000, function () {
        return 'cat say ' + _this5.name;
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this6 = this;

      loop(1000, function () {
        return 'cat run ' + _this6.name;
      });
    }
  }]);

  return Cat;
}(Animal);

// const cat = new Cat('lucy');
//
// cat.say();
// cat.run();


module.exports = Cat;
