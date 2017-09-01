import React from 'react'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
const Pin = ({
	pinData,
	deleteBtn
}) => (
	<Card className='tile'>
		<CardMedia>
      <img src={pinData.url} alt={pinData.description} />
    </CardMedia>
		<CardText>{pinData.description}</CardText>
		<div className='pin-actions'>
			<img src={pinData.userImg} alt='user thumbnail'/>
			{deleteBtn &&
				<FlatButton
					label='delete'
					onClick={() => {
						deleteBtn(pinData.timeStamp)
					}}
				/>
			}
			<FlatButton label='like' />
		</div>
	</Card>
)

export default Pin





