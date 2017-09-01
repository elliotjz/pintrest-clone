import React from 'react'
import NewPinCard from './NewPinCard'
import Grid from './Grid'

const MyPins =({
	pinList,
	openNewPinForm,
  deleteBtn,
  likeBtn
}) => (
  <div>
    <NewPinCard open={openNewPinForm}/>
    {pinList && pinList.length !== 0 ?
      <Grid
        pinList={pinList}
        deleteBtn={deleteBtn}
        likeBtn={likeBtn}
      /> :
      (
        null
      )
    }
  </div>
)


export default MyPins



