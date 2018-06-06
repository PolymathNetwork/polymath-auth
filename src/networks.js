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
    url: 'wss://rinkeby.infura.io/ws'
  },
  [NETWORK_KOVAN]: {
    name: 'Kovan Testnet',
    url: 'wss://heartily-internal-escargot.quiknode.io/46df7525-5518-428e-b30b-9dea09480213/4oM662IRx_2tZJq3ht4wdQ==/'
  },
  local: {
    name: 'Localhost',
    url: 'ws://localhost:8545'
  }
}[id])
