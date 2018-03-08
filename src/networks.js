type Network = {
  name: string,
  url: string
}

export default (id = 'local'): Network => ({
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
}[id])
