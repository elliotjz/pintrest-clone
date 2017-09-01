import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'


const AllPins = ({
  pinList,
  likeBtn,
  userLoggedIn
}) => (
  <div>
    {pinList && pinList.length !== 0 ?
      <Grid
        pinList={pinList}
        likeBtn={likeBtn}
        userLoggedIn={userLoggedIn}
      /> :
      (
        null
      )
    }
  </div>
)

AllPins.PropTypes = {
  pinList: PropTypes.array.isRequired,
  likeBtn: PropTypes.func.isRequired
}

export default AllPins


