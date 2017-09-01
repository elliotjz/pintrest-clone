import React from 'react'
import NewPinCard from './NewPinCard'
import Grid from './Grid'

const MyPins =({
	pinList,
	openNewPinForm
}) => (
  <div>
    <NewPinCard open={openNewPinForm}/>
    {pinList && pinList.length !== 0 ?
      <Grid pinList={pinList} /> :
      (
        null
      )
    }
  </div>
)


export default MyPins



