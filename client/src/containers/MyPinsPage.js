import React from 'react'
import MyPins from '../components/MyPins'
import NewPinForm from '../components/NewPinForm'
import CircularProgress from 'material-ui/CircularProgress';
import Helpers from '../helpers/Helpers'
import Auth from '../config/Auth'

class MyPinsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pins: null,
			firebaseUser: null,
			loading: true,
			errorMessage: null,
			newPinFormOpen: false,
			url: '',
			description: ''
		}

		this.openNewPinForm = this.openNewPinForm.bind(this)
		this.processNewPinForm = this.processNewPinForm.bind(this)
		this.formChange = this.formChange.bind(this)
		this.deletePin = this.deletePin.bind(this)
		this.likeBtn = this.likeBtn.bind(this)
	}

	openNewPinForm() {
		this.setState({
			newPinFormOpen: true
		})
	}

	processNewPinForm(event) {
		event.preventDefault()

		const id = this.state.firebaseUser.uid
		const url = this.state.url
		const description = this.state.description
		const pinData = `id=${id}&url=${url}&description=${description}`

		const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/newpin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
      	this.setState({
      		newPinFormOpen: false,
      		url: '',
      		description: ''
      	})
      	this.getUserPins()
        
      } else {
      	this.setState({
      		errorMessage: 'Couldn\'t add pin at this time. Try again later'
      	})
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

	getUserPins() {
		const id = localStorage.getItem('id')
		this.setState({
			loading: true
		})

		const xhr = new XMLHttpRequest()
    xhr.open('get', '/api/mypins')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('id', id)
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      
      if (xhr.status === 200 && xhr.response.success) {
        this.setState({
        	pins: xhr.response.pins,
        	loading: false,
        })
      } else {
      	this.setState({
      		loading: false,
      		errorMessage: xhr.response.errorMessage
      	})
      }
    })
    xhr.send()
	}

	deletePin(timeStamp) {
		this.setState({
			loading: true
		})

		const id = this.state.firebaseUser.uid

		const xhr = new XMLHttpRequest()
    xhr.open('post', '/api/deletepin')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('timestamp', timeStamp)
    xhr.setRequestHeader('id', id)
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      
      if (xhr.status === 200 && xhr.response.success) {
        this.setState({
        	pins: xhr.response.pins,
        	loading: false,
        })
      } else {
      	this.setState({
      		loading: false,
      		errorMessage: xhr.response.errorMessage
      	})
      }
    })
    xhr.send()
	}

	likeBtn(timeStamp) {
		const id = this.state.firebaseUser.uid
		let pins = this.state.pins
		pins.forEach((pin) => {
			if (pin.timeStamp === parseInt(timeStamp, 10)) {
				const indexOfLike = pin.likes.indexOf(id)
				if (indexOfLike === -1) {
					pin.likes.push(id)
				} else {
					pin.likes.splice(indexOfLike, 1)
				}
			}
		})
		this.setState({
			pins
		})
		Helpers.addLike(timeStamp)
	}

	componentDidMount() {
		Auth.getUser((user) => {
			this.setState({
				firebaseUser: user
			})
		})

		this.getUserPins()
	}

	render() {
		return (
			<div>
				<h1>My Pins</h1>
				{this.state.loading &&
					<CircularProgress size={40} thickness={4} />
				}

				{this.state.errorMessage &&
					<p style={{color: 'red'}}>{this.state.errorMessage}</p>
				}

				<MyPins
					pinList={this.state.pins}
					openNewPinForm={this.openNewPinForm}
					deleteBtn={this.deletePin}
					likeBtn={this.likeBtn}
					userLoggedIn={!!this.state.firebaseUser}
				/>

				{this.state.newPinFormOpen &&
		    	<NewPinForm 
		    		onSubmit={this.processNewPinForm}
		    		onChange={this.formChange}
		    		url={this.state.url}
		    		description={this.state.description}
		    	/>
    		}
			</div>
		)
	}
}

export default MyPinsPage




