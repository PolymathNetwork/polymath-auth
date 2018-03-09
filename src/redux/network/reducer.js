import * as a from './actions'

const defaultState = {
  isConnected: false,
  isFailed: false,
  id: null,
  name: null,
  account: null,
  web3: null,
  web3WS: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case a.CONNECTED:
      return {
        ...state,
        isConnected: true,
        ...action
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
