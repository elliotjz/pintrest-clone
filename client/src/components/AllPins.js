import React from 'react'
import PropTypes from 'prop-types'

class AllPins extends React.Component {

  render() {
    return (
      <div>
        <h1>AllPins</h1>
        {this.props.pinList.length !== 0 ?
          this.props.pinList.map( (item, index) => {
            return <p key={index}>{index}</p>
          }) :
          (
            null
          )
        }
      </div>
    )
  }
}

AllPins.PropTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
  pinList: PropTypes.array.isRequired
}

export default AllPins


