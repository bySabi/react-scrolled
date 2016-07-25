'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Waypoint = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScrollaware = require('react-scrollaware');

var _reactScrollaware2 = _interopRequireDefault(_reactScrollaware);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Calls a function when you scroll to the element.
 */
var Waypoint = exports.Waypoint = (0, _reactScrollaware2.default)((_temp = _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$_scrolled = nextProps._scrolled;
      var currentPosition = _nextProps$_scrolled.currentPosition;
      var previousPosition = _nextProps$_scrolled.previousPosition;
      var event = _nextProps$_scrolled.event;


      if (previousPosition === currentPosition) {
        // No change since last trigger
        return;
      }

      var callbackArg = {
        currentPosition: currentPosition,
        previousPosition: previousPosition,
        event: event
      };

      this.props.onPositionChange.call(this, callbackArg);

      if (currentPosition === _utils.POSITIONS.inside) {
        this.props.onEnter.call(this, callbackArg);
      } else if (previousPosition === _utils.POSITIONS.inside) {
        this.props.onLeave.call(this, callbackArg);
      }

      var isRapidScrollDown = previousPosition === _utils.POSITIONS.below && currentPosition === _utils.POSITIONS.above;
      var isRapidScrollUp = previousPosition === _utils.POSITIONS.above && currentPosition === _utils.POSITIONS.below;
      if (this.props.fireOnRapidScroll && (isRapidScrollDown || isRapidScrollUp)) {
        // If the scroll event isn't fired often enough to occur while the
        // waypoint was visible, we trigger both callbacks anyway.
        this.props.onEnter.call(this, {
          currentPosition: _utils.POSITIONS.inside,
          previousPosition: previousPosition,
          event: event
        });
        this.props.onLeave.call(this, {
          currentPosition: currentPosition,
          previousPosition: _utils.POSITIONS.inside,
          event: event
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', { style: { fontSize: 0 } });
    }
  }]);

  return _class;
}(_react2.default.Component), _class.propTypes = {
  onEnter: _react.PropTypes.func,
  onLeave: _react.PropTypes.func,
  onPositionChange: _react.PropTypes.func,
  fireOnRapidScroll: _react.PropTypes.bool
}, _class.defaultProps = {
  onEnter: function onEnter() {},
  onLeave: function onLeave() {},
  onPositionChange: function onPositionChange() {},

  fireOnRapidScroll: true
}, _temp));