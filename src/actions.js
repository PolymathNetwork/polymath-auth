// @flow

import Web3 from 'web3'

import getNetwork from './networks'
import type { NetworkParams } from '../types'
import type { ExtractReturn } from './helpers'

export const CONNECTED = 'polymath-auth/CONNECTED'
const connected = (params: NetworkParams) => ({ type: CONNECTED, params })

export const FAIL = 'polymath-auth/FAIL'
const fail = () => ({ type: FAIL })

export type Action =
  | ExtractReturn<typeof connected>
  | ExtractReturn<typeof fail>

const web3 = new Web3()
const web3WS = new Web3() // since MetaMask doesn't support WebSockets we need this extra client for events subscribing

export const init = () => async (dispatch: Function) => {
  try {
    let id
    if (typeof window.web3 !== 'undefined') { // Metamask/Mist
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
      id = await web3.eth.net.getId()
    }

    const name = network.name
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

    dispatch(connected({ id, name, account, web3, web3WS }))
  } catch (e) {
    // eslint-disable-next-line
    console.error('Network initialization failed', e)
    dispatch(fail())
  }
}
