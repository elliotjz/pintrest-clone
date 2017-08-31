import React from 'react'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const customStyle = {
	width: '300px',
	padding: '5px'
}

class NewPinCard extends React.Component {

  render() {
    return (
      <div>
      	<Card style={customStyle}>
        	<RaisedButton label='New Pin' onClick={this.props.open} />
        </Card>
      </div>
    )
  }
}

export default NewPinCard
