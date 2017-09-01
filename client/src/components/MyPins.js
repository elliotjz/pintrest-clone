import React from 'react'
import Grid from './Grid'

const MyPins =({
	pinList,
  deleteBtn,
  likeBtn,
  userLoggedIn
}) => (
  <div>
    {pinList && pinList.length !== 0 ?
      <Grid
        pinList={pinList}
        deleteBtn={deleteBtn}
        likeBtn={likeBtn}
        userLoggedIn={userLoggedIn}
      /> :
      (
        null
      )
    }
  </div>
)


export default MyPins



