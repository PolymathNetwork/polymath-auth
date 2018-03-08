import Web3 from 'web3'

import { actionGen } from '../helpers'
import getNetwork from '../../networks'

export const CONNECTED = 'network/CONNECTED'
export const FAIL = 'network/FAIL'

const connected = actionGen(CONNECTED)
const fail = actionGen(FAIL)

const web3 = new Web3()
const web3WS = new Web3() // since MetaMask doesn't support WebSockets we need this extra client for events subscribing

// noinspection JSUnusedGlobalSymbols
export const init = () => async (dispatch) => {
  try {
    let id
    if (typeof window.web3 !== undefined) { // Metamask/Mist
      web3.setProvider(window.web3.currentProvider)
      id = await web3.eth.net.getId()
    }
    const network = getNetwork(id)
    if (network === undefined) {
      throw new Error('unsupported network')
    }
    web3WS.setProvider(new Web3.providers.WebsocketProvider(network.url))
    if (!id) {
      // eslint-disable-next-line
      console.log('Using localhost')
      web3.setProvider(web3WS.currentProvider)
    }

    const [account] = await web3.eth.getAccounts()
    if (id) {
      // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
      setInterval(() => {
        web3.eth.getAccounts().then(accounts => {
          if (accounts[0] !== account) {
            window.location.reload()
          }
        })
        web3.eth.net.getId().then(_id => {
          if (id !== _id) {
            window.location.reload()
          }
        })
      }, 100)
    }
    if (!account) {
      throw new Error('invalid account')
    }

    // TODO @bshevchenko: https://github.com/INFURA/infura/issues/80 hack below
    web3WS.eth.subscribe('newBlockHeaders', (error) => {
      if (error) {
        // eslint-disable-next-line
        console.error('web3WS newBlockHeaders', error)
      }
    })

    dispatch(connected({ name, account }))
  } catch (e) {
    // eslint-disable-next-line
    console.error('Network initialization failed', e)
    dispatch(fail())
  }
}
