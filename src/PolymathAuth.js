// eslint-disable-next-line
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { init } from './redux/network/actions'

class PolymathAuth extends Component {
  static propTypes = {
    init: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired
  };

  componentWillMount () {
    window.addEventListener('load', () => {
      this.props.init()
    })
  }

  render () {
    if (this.props.isConnected) {
      return this.props.children
    }
    if (!this.props.isFailed) {
      return <p>Initializing connection to the blockchain...</p>
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

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  isFailed: state.network.isFailed
})

const mapDispatchToProps = {
  init
}

export default connect(mapStateToProps, mapDispatchToProps)(PolymathAuth)
