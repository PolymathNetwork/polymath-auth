'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    isConnected: state.network.isConnected,
    isFailed: state.network.isFailed,
    error: state.network.error
  };
};

// eslint-disable-next-line


var mapDispatchToProps = {
  init: _actions.init
};

var PolymathAuth = function (_Component) {
  (0, _inherits3.default)(PolymathAuth, _Component);

  function PolymathAuth() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PolymathAuth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PolymathAuth.__proto__ || (0, _getPrototypeOf2.default)(PolymathAuth)).call.apply(_ref, [this].concat(args))), _this), _this.init = function () {
      _this.props.init(_this.props.networks);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PolymathAuth, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (!this.props.isConnected && !this.props.isFailed) {
        if (document.readyState === 'complete') {
          this.init();
        } else {
          window.addEventListener('load', function () {
            _this2.init();
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isConnected) {
        return this.props.children;
      }
      if (!this.props.isFailed) {
        return this.props.loading;
      }
      return this.props.guide;
    }
  }]);
  return PolymathAuth;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PolymathAuth);