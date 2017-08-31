import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AllPinsPage from './containers/AllPinsPage'
import MyPinsPage from './containers/MyPinsPage'
import Logout from './components/Logout'
import LoginPage from './containers/LoginPage'


const Main = () => (
	<div>
		<Switch>
			<Route exact path='/' component={AllPinsPage} />
			<Route exact path='/mypins' component={MyPinsPage} />
			<Route exact path='/logout' render={() => {
				return !!localStorage.getItem('token') ?
				(
					<Logout />
				) :
				(
					<Redirect to='/' push />
				)
			}}
			/>
			<Route exact path='/login' render={() => {
				return !!localStorage.getItem('token') ?
				(
					<Redirect to='/' push />
				) :
				(
					<LoginPage />
				)
			}}
			/>
		</Switch>
	</div>
)

export default Main