import React from 'react'
import { Card, CardMedia, CardText } from 'material-ui/Card'

const Pin = ({
	pinData
}) => (
	<Card className='pin'>
		<CardMedia>
      <img src={pinData.url} alt={pinData.description} />
    </CardMedia>
		<CardText>{pinData.description}</CardText>
		<CardText>{pinData.timeStamp}</CardText>
	</Card>
)

export default Pin





