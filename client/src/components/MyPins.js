import React from 'react'
import NewPinCard from './NewPinCard'
import Grid from './Grid'

const MyPins =({
	pinList,
	openNewPinForm,
  deleteBtn,
  likeBtn,
  userLoggedIn
}) => (
  <div>
    <NewPinCard open={openNewPinForm}/>
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



