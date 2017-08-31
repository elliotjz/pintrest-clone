import React from 'react'
import Auth from '../config/Auth'

class Logout extends React.Component {
	
	componentWillMount() {
		Auth.logout(() => {
			window.location.reload()
		})
	}

	render() {
		return (
			<p>logging out...</p>
		)
	}
}

export default Logout