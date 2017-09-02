import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

class NewPinForm extends React.Component {

  formClick(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div id='screen' onClick={this.props.closeForm}>
      	<Card
          id='new-pin-form'
          onClick={this.formClick}
          
        >
          <CardTitle title="Create New Pin"/>
          <form onSubmit={this.props.onSubmit} >
            <TextField
              floatingLabelText="Picture URL"
              name="url"
              onChange={this.props.onChange}
              value={this.props.url}
            />
            <TextField
              floatingLabelText="Description"
              name="description"
              onChange={this.props.onChange}
              value={this.props.description}
            />
            <RaisedButton label='Create' type='submit' />
          </form>
        </Card>
      </div>
    )
  }
}


export default NewPinForm
