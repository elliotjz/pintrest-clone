import React from 'react'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

class NewPinCard extends React.Component {

  render() {
    return (
      <div>
      	<Card className='pin'>
        	<RaisedButton label='New Pin' onClick={this.props.open} />
        </Card>
      </div>
    )
  }
}

export default NewPinCard
