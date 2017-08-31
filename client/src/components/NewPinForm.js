import React from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';


const NewPinForm = ({
  onSubmit,
  onChange,
  formData
}) => (
  <div id='screen'>
  	<Card id='new-pin-form'>
      <CardHeader title="Create New Pin" />
      <form onSubmit={onSubmit} >
        <TextField
          floatingLabelText="Picture URL"
          name="url"
          onChange={onChange}
          value={formData.url}
        />
        <TextField
          floatingLabelText="Description"
          name="description"
          onChange={onChange}
          value={formData.description}
        />
        <RaisedButton label='Create' type='submit' />
      </form>
    </Card>
  </div>
)


export default NewPinForm
