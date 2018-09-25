'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.ERROR_DISCONNECTED = exports.ERROR_NETWORK = exports.ERROR_LOCKED = exports.ERROR_NOT_INSTALLED = exports.FAIL = exports.CONNECTED = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _networks = require('./networks');

var _networks2 = _interopRequireDefault(_networks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONNECTED = exports.CONNECTED = 'polymath-auth/CONNECTED';
var connected = function connected(params) {
  return { type: CONNECTED, params: params };
};

var FAIL = exports.FAIL = 'polymath-auth/FAIL';
var fail = function fail(error) {
  return { type: FAIL, error: error };
};

var web3 = new _web2.default();
var web3WS = new _web2.default(); // since MetaMask doesn't support WebSockets we need this extra client for events subscribing

var ERROR_NOT_INSTALLED = exports.ERROR_NOT_INSTALLED = 1;
var ERROR_LOCKED = exports.ERROR_LOCKED = 2;
var ERROR_NETWORK = exports.ERROR_NETWORK = 3;
var ERROR_DISCONNECTED = exports.ERROR_DISCONNECTED = 4;

var init = exports.init = function init(networks) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var _id2, isLocalhost, network, _name, _ref2, _ref3, _account;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _id2 = undefined;

              if (!(typeof window.web3 !== 'undefined')) {
                _context.next = 7;
                break;
              }

              // Metamask/Mist
              web3.setProvider(window.web3.currentProvider);
              _context.next = 6;
              return web3.eth.net.getId();

            case 6:
              _id2 = _context.sent;

            case 7:
              isLocalhost = Number(_id2) > 10000000 || _id2 === undefined;
              network = (0, _networks2.default)(!isLocalhost ? _id2 : undefined);

              if (!(network === undefined || !isLocalhost && !networks.includes(String(_id2)))) {
                _context.next = 11;
                break;
              }

              throw new Error(ERROR_NETWORK);

            case 11:
              web3WS.setProvider(process.env.REACT_APP_NODE_WS || network.url);

              if (_id2) {
                _context.next = 17;
                break;
              }

              web3.setProvider(web3WS.currentProvider);
              _context.next = 16;
              return web3.eth.net.getId();

            case 16:
              _id2 = _context.sent;

            case 17:
              _name = network.name;
              _context.next = 20;
              return web3.eth.getAccounts();

            case 20:
              _ref2 = _context.sent;
              _ref3 = (0, _slicedToArray3.default)(_ref2, 1);
              _account = _ref3[0];

              if (_id2) {
                // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
                setInterval(function () {
                  web3.eth.getAccounts().then(function (accounts) {
                    if (accounts[0] !== _account) {
                      window.location.reload();
                    }
                  });
                  web3.eth.net.getId().then(function (_id) {
                    if (_id2 !== _id) {
                      window.location.reload();
                    }
                  });
                }, 100);
              }

              if (_account) {
                _context.next = 26;
                break;
              }

              throw new Error(ERROR_LOCKED);

            case 26:

              // TODO @bshevchenko: https://github.com/INFURA/infura/issues/80 hack below
              web3WS.eth.subscribe('newBlockHeaders', function (error) {
                if (error) {
                  // eslint-disable-next-line
                  console.error('web3WS newBlockHeaders', error);
                  dispatch(fail(ERROR_DISCONNECTED));
                }
              });

              dispatch(connected({ id: _id2, name: _name, account: _account, web3: web3, web3WS: web3WS }));
              _context.next = 34;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context['catch'](0);

              if (![ERROR_LOCKED, ERROR_NETWORK].includes(Number(_context.t0.message))) {
                // eslint-disable-next-line
                console.error('polymath-auth', _context.t0);
                _context.t0.message = ERROR_NOT_INSTALLED;
              }
              dispatch(fail(_context.t0.message));

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 30]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};