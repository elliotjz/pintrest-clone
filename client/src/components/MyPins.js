import React from 'react'
import NewPinCard from './NewPinCard'
import NewPinForm from './NewPinForm'

class MyPins extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newPinFormOpen: false,
			url: '',
			description: ''
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
			url: this.state.url,
			description: this.state.description
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
		const name = event.target.name
		
		this.setState({
			[name]: event.target.value
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
        		url={this.state.url}
        		description={this.state.description}
        	/>
        }
      </div>
    )
  }
}

export default MyPins
