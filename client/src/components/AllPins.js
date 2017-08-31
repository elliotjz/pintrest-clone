import React from 'react'
import PropTypes from 'prop-types'
import Pin from './Pin'


class AllPins extends React.Component {

  render() {
    return (
      <div>
        {this.props.pinList && this.props.pinList.length !== 0 ?
          this.props.pinList.map( (item, index) => {
            return <Pin key={index} pinData={item} />
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
  pinList: PropTypes.array.isRequired
}

export default AllPins


