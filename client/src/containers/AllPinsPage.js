import React from 'react'
import AllPins from '../components/AllPins'
import CircularProgress from 'material-ui/CircularProgress';
import Helpers from '../helpers/Helpers'
import Auth from '../config/Auth'

class AllPinsPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pins: null,
			loading: true,
			errorMessage: null,
			firebaseUser: null
		}

		this.likeBtn = this.likeBtn.bind(this)
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

		const xhr = new XMLHttpRequest()
    xhr.open('get', '/api/allpins')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
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
      		errorMessage: xhr.response.errorMessage,
      	})
      }
    })
    xhr.send()
	}

	render() {
		return (
			<div>
				<h1>All Pins</h1>
				{this.state.loading &&
					<CircularProgress size={40} thickness={4} />
				}
				{this.state.errorMessage &&
					<p style={{color: 'red'}}>{this.state.errorMessage}</p>
				}
				<AllPins
					pinList={this.state.pins}
					likeBtn={this.likeBtn}
					userLoggedIn={!!this.state.firebaseUser}
				/>
			</div>
		)
	}
}

export default AllPinsPage




