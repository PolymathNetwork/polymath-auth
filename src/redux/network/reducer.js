import * as a from './actions'

const defaultState = {
  connected: false,
  fail: false,
  name: null,
  account: null,
}

// noinspection JSUnusedGlobalSymbols
export default (state = defaultState, action) => {
  switch (action.type) {
    case a.CONNECTED:
      return {
        ...state,
        connected: true,
        name: action.name,
        account: action.account,
      }
    case a.FAIL:
      return {
        ...state,
        connected: false,
        fail: true,
      }
    default:
      return state
  }
}
