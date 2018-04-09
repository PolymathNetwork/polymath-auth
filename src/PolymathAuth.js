// @flow

// eslint-disable-next-line
import React, { Component } from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { Loading } from 'carbon-components-react'
import type { Node } from 'react'

import { init } from './actions'

type StateProps = {|
  isConnected: boolean,
  isFailed: boolean,
|}

type DispatchProps = {|
  init: () => any,
|}

const mapStateToProps = (state): StateProps => ({
  isConnected: state.network.isConnected,
  isFailed: state.network.isFailed
})

const mapDispatchToProps: DispatchProps = {
  init,
}

type Props = {|
  children: Node,
|} & StateProps & DispatchProps

class PolymathAuth extends Component<Props> {

  componentWillMount () {
    if (!this.props.isConnected && !this.props.isFailed) {
      if (document.readyState === 'complete') {
        this.props.init()
      } else {
        window.addEventListener('load', () => {
          this.props.init()
        })
      }
    }
  }

  render () {
    if (this.props.isConnected) {
      return this.props.children
    }
    if (!this.props.isFailed) {
      return <Loading />
    }
    return (
      <p>
        Oops! Something is wrong with connection to the contracts.
        <br />
        Please make sure that you choose Ropsten network and your
        Mist/Metamask is unlocked.
      </p>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolymathAuth)
