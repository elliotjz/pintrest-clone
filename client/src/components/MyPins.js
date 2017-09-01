import React from 'react'
import NewPinCard from './NewPinCard'
import Grid from './Grid'

const MyPins =({
	pinList,
	openNewPinForm,
  deleteBtn
}) => (
  <div>
    <NewPinCard open={openNewPinForm}/>
    {pinList && pinList.length !== 0 ?
      <Grid
        pinList={pinList}
        deleteBtn={deleteBtn}
      /> :
      (
        null
      )
    }
  </div>
)


export default MyPins



