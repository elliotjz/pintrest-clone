import React from 'react'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Like from 'material-ui/svg-icons/action/thumb-up'
import {blue200, blue500, red300, red500, grey100, grey800} from 'material-ui/styles/colors'

const style = {
	backgroundColor: grey800,
	padding: '5px',

}

const Pin = ({
	pinData,
	deleteBtn,
	likeBtn,
	userLoggedIn,
	filterUser
}) => (
	<Card className='tile' style={style}>
		<CardMedia>
      <img
      	src={pinData.url}
      	alt={pinData.description}
      />
    </CardMedia>

    <div className='pin-description'>
			<CardText
				style={{color: '#fff'}}
			>
				{pinData.description}
			</CardText>
		</div>
		<div className='pin-actions'>
			<img
				src={pinData.userImg}
				alt='user thumbnail'
				onClick={() => {
      		filterUser(pinData.userId)
      	}}
			/>

			{deleteBtn &&
				<IconButton
					touch={true}
					onClick={() => {
						deleteBtn(pinData.timeStamp)
					}}
				>
		      <Delete
		      	color={red300}
		      	hoverColor={red500}
		      />
		    </IconButton>
		  }
		  {userLoggedIn &&
		    <div className='like-container'>
			    <IconButton
						touch={true}
						onClick={() => {
							likeBtn(pinData.timeStamp)
						}}
					>
						{pinData.likes.indexOf(localStorage.getItem('id')) === -1 ?
							<Like
								color={grey100}
								hoverColor={blue200}
							/> :
							<Like
								color={blue500}
							/>
						}
					</IconButton>
					<p>{pinData.likes.length}</p>
				</div>
			}
		</div>
	</Card>
)

export default Pin





