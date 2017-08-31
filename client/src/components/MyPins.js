import React from 'react'
import NewPinCard from './NewPinCard'
import Pin from './Pin'

const MyPins =({
	pinList,
	openNewPinForm
}) => (
  <div>
    <NewPinCard open={openNewPinForm}/>
    {pinList && pinList.length !== 0 ?
      pinList.map( (item, index) => {
        return <Pin key={index} pinData={item} />
      }) :
      (
        null
      )
    }
    
  </div>
)


export default MyPins



