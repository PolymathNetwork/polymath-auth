'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NETWORK_KOVAN = exports.NETWORK_RINKEBY = exports.NETWORK_ROPSTEN = exports.NETWORK_MAIN = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NETWORK_MAIN = exports.NETWORK_MAIN = '1';

var NETWORK_ROPSTEN = exports.NETWORK_ROPSTEN = '3';
var NETWORK_RINKEBY = exports.NETWORK_RINKEBY = '4';
var NETWORK_KOVAN = exports.NETWORK_KOVAN = '42';

exports.default = function () {
  var _NETWORK_MAIN$NETWORK;

  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'local';
  return (_NETWORK_MAIN$NETWORK = {}, (0, _defineProperty3.default)(_NETWORK_MAIN$NETWORK, NETWORK_MAIN, {
    name: 'Mainnet',
    url: process.env.REACT_APP_NETWORK_MAIN_URL
  }), (0, _defineProperty3.default)(_NETWORK_MAIN$NETWORK, NETWORK_ROPSTEN, {
    name: 'Ropsten Testnet',
    url: 'wss://ropsten.infura.io/ws'
  }), (0, _defineProperty3.default)(_NETWORK_MAIN$NETWORK, NETWORK_RINKEBY, {
    name: 'Rinkeby Testnet',
    url: 'wss://rinkeby.infura.io/ws'
  }), (0, _defineProperty3.default)(_NETWORK_MAIN$NETWORK, NETWORK_KOVAN, {
    name: 'Kovan Testnet',
    url: process.env.REACT_APP_NETWORK_KOVAN_URL
  }), (0, _defineProperty3.default)(_NETWORK_MAIN$NETWORK, 'local', {
    name: 'Localhost',
    url: 'ws://localhost:8545'
  }), _NETWORK_MAIN$NETWORK)[id];
};