import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import Helpers from '../helpers/Helpers'
import Auth from '../config/Auth'
import Masonry from 'react-masonry-component'
import Pin from '../components/Pin'

class AllPinsPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pins: null,
			loading: true,
			errorMessage: null,
			firebaseUser: null,
			filterUser: null,
			style: {}
		}

		this.likeBtn = this.likeBtn.bind(this)
		this.applyUserFilter = this.applyUserFilter.bind(this)
		this.backToAll = this.backToAll.bind(this)
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

	applyUserFilter(id) {
		this.setState({
			filterUser: id
		})
	}

	backToAll() {
		this.setState({
			filterUser: null
		})
	}

	resizeGallery() {
		const windowWidth = window.innerWidth
    let galleryWidth = '300px'
    if (windowWidth >= 1200) {
    	galleryWidth = '1200px'
    } else if (windowWidth >= 900) {
    	galleryWidth = '900px'
    } else if (windowWidth >= 600) {
    	galleryWidth = '600px'
    }
    this.setState({
    	style: {
				margin: 'auto',
				width: galleryWidth
			}
    })
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

    this.resizeGallery()
    window.addEventListener("resize", () => {
	    this.resizeGallery()
		})
	}

	render() {
		let pinData = this.state.filterUser ?
			this.state.pins.filter((pin) => {
      	return pin.userId === this.state.filterUser
      }) : this.state.pins

		let childElements = this.state.pins ?
			pinData.map((pin, index) => {
				return (
					<div key={index}>
				    <Pin
							pinData={pin}
							likeBtn={this.likeBtn}
							userLoggedIn={!!this.state.firebaseUser}
							filterUser={this.applyUserFilter}
						/>
					</div>
				)
			}) :
			null

		return (
			<div className='page'>
				{!this.state.filterUser &&
					<h1>All Pins</h1>
				}

				{this.state.loading &&
					<CircularProgress size={40} thickness={4} />
				}

				{this.state.errorMessage &&
					<p style={{color: 'red'}}>{this.state.errorMessage}</p>
				}

				{this.state.filterUser &&
					<div id='back-to-all-btn'>
						<RaisedButton
							label='back to all'
							onClick={this.backToAll}
							primary
						/>
					</div>
				}
				{this.state.pins && this.state.pins.length !== 0 ?
		      <div style={this.state.style}>
						<Masonry className='my-gallery-class'>
		          {childElements}
		        </Masonry>
		      </div> :
		      (
		        null
		      )
		    }
			</div>
		)
	}
}

export default AllPinsPage




