import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'


const AllPins = ({
  pinList
}) => (
  <div>
    {pinList && pinList.length !== 0 ?
      <Grid pinList={pinList}/> :
      (
        null
      )
    }
  </div>
)

AllPins.PropTypes = {
  pinList: PropTypes.array.isRequired
}

export default AllPins


