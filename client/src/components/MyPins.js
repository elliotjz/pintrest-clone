import React from 'react'
import NewPinCard from './NewPinCard'
import NewPinForm from './NewPinForm'

class MyPins extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newPinFormOpen: false,
			formData: {
				url: '',
				description: ''
			}
		}

		this.openNewPinForm = this.openNewPinForm.bind(this)
		this.processForm = this.processForm.bind(this)
		this.formChange = this.formChange.bind(this)
	}

	openNewPinForm() {
		this.setState({
			newPinFormOpen: true
		})
	}

	processForm(event) {
		event.preventDefault()

		const pinData = {
			id: localStorage.getItem('id'),
			url: this.state.formData.url,
			description: this.state.formData.description
		}

		const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/newpin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
      	console.log('200!!!')
        
      }
    })
    xhr.send(pinData);
	}

	formChange(event) {
		const field = event.target.name
		let formData = this.state.formData
		formData[field] = event.target.value

		this.setState({
			formData
		})
	}

  render() {
    return (
      <div>
        <h1>My Pins</h1>
        <NewPinCard open={this.openNewPinForm}/>
        {this.state.newPinFormOpen &&
        	<NewPinForm 
        		onSubmit={this.processForm}
        		onChange={this.formChange}
        		formData={this.state.formData}
        	/>
        }
      </div>
    )
  }
}

export default MyPins
