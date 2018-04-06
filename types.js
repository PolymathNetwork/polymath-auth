// @flow

import Web3 from 'web3'

export type NetworkParams = {|
  id: number,
  name: string,
  account: string,
  web3: Web3,
  web3WS: Web3,
|}

export type NetworkState = {|
  isConnected: boolean,
  isFailed: boolean,
  id: ?number,
  name: ?string,
  account: ?string,
  web3: ?Web3,
  web3WS: ?Web3,
|}
