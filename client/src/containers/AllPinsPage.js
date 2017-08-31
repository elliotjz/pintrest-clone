import React from 'react'
import AllPins from '../components/AllPins'
import Auth from '../config/Auth'

class AllPinsPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			message: 'Getting from server',
			errorMessage: null,
			user: null
		}
		this.login = this.login.bind(this)
	}

	login(event) {
		event.preventDefault()
		Auth.login((loginResult) => {
			if (loginResult.user) {
				this.setState({
					user: loginResult.user
				})
			} else {
				this.setState({
					errorMessage: loginResult.errorMessage
				})
			}
		})
	}

	componentDidMount() {

		const xhr = new XMLHttpRequest()
    xhr.open('get', '/api/data')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    // set the authorization HTTP header
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      
      if (xhr.status === 200 && xhr.response.data) {
        this.setState({
          message: xhr.response.data
        })
      } else {
      	this.setState({
      		message: 'server error. Unable to get message.'
      	})
      }
    })
    xhr.send()
	}

	render() {
		return (
			<AllPins
				user={!!this.state.user}
				pinList={[1,2,3]}
			/>
		)
	}
}

export default AllPinsPage