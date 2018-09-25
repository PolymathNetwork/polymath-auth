'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _actions = require('./actions');

var a = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  isConnected: false,
  isFailed: false,
  error: null,
  id: null,
  name: null,
  account: null,
  web3: null,
  web3WS: null
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case a.CONNECTED:
      return (0, _extends3.default)({}, state, {
        isConnected: true
      }, action.params);
    case a.FAIL:
      return (0, _extends3.default)({}, state, {
        isConnected: false,
        isFailed: true,
        error: action.error
      });
    default:
      return state;
  }
};