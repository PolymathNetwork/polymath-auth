'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducers = undefined;

var _reducer = require('./redux/network/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _PolymathAuth = require('./PolymathAuth');

var _PolymathAuth2 = _interopRequireDefault(_PolymathAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = exports.reducers = {
  network: _reducer2.default
};

exports.default = _PolymathAuth2.default;