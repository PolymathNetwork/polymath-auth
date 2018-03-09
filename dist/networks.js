'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'local';
  return {
    1: {
      name: 'Mainnet',
      url: 'wss://mainnet.infura.io/ws'
    },
    3: {
      name: 'Ropsten Testnet',
      url: 'wss://ropsten.infura.io/ws'
    },
    local: {
      name: 'Localhost',
      url: 'ws://localhost:8545'
    }
  }[id];
};