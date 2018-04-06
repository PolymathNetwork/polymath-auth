// @flow

import * as a from './actions'
import type { Action } from './actions'
import type { NetworkState } from '../types'

const defaultState: NetworkState = {
  isConnected: false,
  isFailed: false,
  id: null,
  name: null,
  account: null,
  web3: null,
  web3WS: null
}

export default (state: NetworkState = defaultState, action: Action) => {
  switch (action.type) {
    case a.CONNECTED:
      return {
        ...state,
        isConnected: true,
        ...action.params
      }
    case a.FAIL:
      return {
        ...state,
        isConnected: false,
        isFailed: true,
      }
    default:
      return state
  }
}
