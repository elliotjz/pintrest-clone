import React from 'react'
import AllPins from '../components/AllPins'
import CircularProgress from 'material-ui/CircularProgress';

class AllPinsPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pins: null,
			loading: true,
			errorMessage: null
		}
	}

	componentDidMount() {

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
      		errorMessage: xhr.response.errorMessage
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
				/>
			</div>
		)
	}
}

export default AllPinsPage




