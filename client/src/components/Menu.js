import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			wideScreen: false,
			open: false,
			auth: false
		}

		this.handleClose = this.handleClose.bind(this)
	}

	isWideScreen() {
    return document.documentElement.clientWidth > 450
  }

  getMenuItems() {
		return this.state.auth ?
			[
				{url: '/', text: 'All'},
				{url: '/mypins', text: 'My Pins'},
				{url: '/logout', text: 'Logout'}
			] :
			[
				{url: '/', text: 'All'},
				{url: '/login', text: 'Login'},
			]
	}

	handleClose() {
		this.setState({
			open: false
		})
	}

	componentWillMount() {
		this.setState({
			auth: !!localStorage.getItem('token')
		})
	}

  componentDidMount() {
  	this.setState({
			wideScreen: this.isWideScreen()
		});
    window.addEventListener("resize", () => {
    	this.setState({ wideScreen: this.isWideScreen() })
    })
  }

	render() {
		let menuItems = this.getMenuItems()
		return this.state.wideScreen ?
		(
			<div id='flat-menu-container'>
				{menuItems.map( (item, index) => {
					return (
						<Link to={item.url} key={index} >
							<div className='menu-btn'>
								<FlatButton label={item.text} />
							</div>
						</Link>
					)
				})}
			</div>
		) :
		(
			<IconMenu
				iconButtonElement={<IconButton><MenuIcon/></IconButton>}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				onRequestChange={open => this.setState({ open })}
				open={this.state.open}
			>
				{menuItems.map( (item, index) => {
					return (
						<Link to={item.url} key={index} >
							<MenuItem
								primaryText={item.text}
								onTouchTap={this.handleClose}
							/>
						</Link>
					)
				})}
			</IconMenu>
		)
	}
}

export default Menu
