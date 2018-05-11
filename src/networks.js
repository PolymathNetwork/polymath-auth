// @flow

type Network = {
  name: string,
  url: string,
}

export const NETWORK_MAIN = '1'
export const NETWORK_ROPSTEN = '3'
export const NETWORK_RINKEBY = '4'
export const NETWORK_KOVAN = '42'

export default (id: string = 'local'): Network => ({
  [NETWORK_MAIN]: {
    name: 'Mainnet',
    url: 'wss://mainnet.infura.io/ws'
  },
  [NETWORK_ROPSTEN]: {
    name: 'Ropsten Testnet',
    url: 'wss://ropsten.infura.io/ws'
  },
  [NETWORK_RINKEBY]: {
    name: 'Rinkeby Testnet',
    url: 'wss://literally-sweet-toucan.quiknode.io/bccec097-e5b3-4af6-89ad-e801348cd020/E8IXmvjZj_C0njVBM7tTxA==/'
  },
  // [NETWORK_KOVAN]: {
  //   name: 'Kovan Testnet',
  //   url: 'wss://kovan.infura.io/ws'
  // },
  local: {
    name: 'Localhost',
    url: 'ws://localhost:8545'
  }
}[id])
