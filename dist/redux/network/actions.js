'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.FAIL = exports.CONNECTED = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _helpers = require('../helpers');

var _networks = require('../../networks');

var _networks2 = _interopRequireDefault(_networks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONNECTED = exports.CONNECTED = 'network/CONNECTED';
var FAIL = exports.FAIL = 'network/FAIL';

var connected = (0, _helpers.actionGen)(CONNECTED);
var fail = (0, _helpers.actionGen)(FAIL);

var web3 = new _web2.default();
var web3WS = new _web2.default(); // since MetaMask doesn't support WebSockets we need this extra client for events subscribing

var init = exports.init = function init() {
  return async function (dispatch) {
    try {
      var id = void 0;
      if (_typeof(window.web3) !== undefined) {
        // Metamask/Mist
        web3.setProvider(window.web3.currentProvider);
        id = await web3.eth.net.getId();
      }
      var network = (0, _networks2.default)(id);
      if (network === undefined) {
        throw new Error('unsupported network');
      }
      web3WS.setProvider(new _web2.default.providers.WebsocketProvider(network.url));
      if (!id) {
        // eslint-disable-next-line
        console.log('Using localhost');
        web3.setProvider(web3WS.currentProvider);
      }

      var _ref = await web3.eth.getAccounts(),
          _ref2 = _slicedToArray(_ref, 1),
          account = _ref2[0];

      if (id) {
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
        setInterval(function () {
          web3.eth.getAccounts().then(function (accounts) {
            if (accounts[0] !== account) {
              window.location.reload();
            }
          });
          web3.eth.net.getId().then(function (_id) {
            if (id !== _id) {
              window.location.reload();
            }
          });
        }, 100);
      }
      if (!account) {
        throw new Error('invalid account');
      }

      // TODO @bshevchenko: https://github.com/INFURA/infura/issues/80 hack below
      web3WS.eth.subscribe('newBlockHeaders', function (error) {
        if (error) {
          // eslint-disable-next-line
          console.error('web3WS newBlockHeaders', error);
        }
      });

      dispatch(connected({ id: id, name: name, account: account, web3: web3, web3WS: web3WS }));
    } catch (e) {
      // eslint-disable-next-line
      console.error('Network initialization failed', e);
      dispatch(fail());
    }
  };
};