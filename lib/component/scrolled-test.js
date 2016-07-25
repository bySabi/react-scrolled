'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrolledTest = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ScrolledTestThrottle = ScrolledTestThrottle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScrollaware = require('react-scrollaware');

var _reactScrollaware2 = _interopRequireDefault(_reactScrollaware);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrolledTest = exports.ScrolledTest = (0, _reactScrollaware2.default)(function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
  }

  _createClass(_class, [{
    key: '_handleScroll',
    value: function _handleScroll(event) {
      console.log('scrollAware scrolled');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', { style: { fontSize: 0 } });
    }
  }]);

  return _class;
}(_react2.default.Component));

function ScrolledTestThrottle(props) {
  return _react2.default.createElement(ScrolledTest, _extends({}, props, {
    throttleHandler: function throttleHandler(scrollHandler) {
      return (0, _lodash2.default)(scrollHandler, 500);
    }
  }));
}