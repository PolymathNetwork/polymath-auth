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
    url: process.env.REACT_APP_NETWORK_MAIN_URL
  },
  [NETWORK_ROPSTEN]: {
    name: 'Ropsten Testnet',
    url: 'wss://ropsten.infura.io/ws'
  },
  [NETWORK_RINKEBY]: {
    name: 'Rinkeby Testnet',
    url: 'wss://rinkeby.infura.io/ws'
  },
  [NETWORK_KOVAN]: {
    name: 'Kovan Testnet',
    url: process.env.REACT_APP_NETWORK_KOVAN_URL
  },
  local: {
    name: 'Localhost',
    url: 'ws://localhost:8545'
  }
}[id])
