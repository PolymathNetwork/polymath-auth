import * as a from './actions'

const defaultState = {
  isConnected: false,
  isFailed: false,
  name: null,
  account: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case a.CONNECTED:
      return {
        ...state,
        isConnected: true,
        name: action.name,
        account: action.account,
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
