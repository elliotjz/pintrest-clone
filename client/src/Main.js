import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllPinsPage from './containers/AllPinsPage'
import MyPinsPage from './containers/MyPinsPage'
import SettingsPage from './containers/SettingsPage'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import Logout from './components/Logout'

import NotFound from './components/NotFound'
import Auth from './modules/Auth'


const Main = () => (
	<div>
		<Switch>
			<Route exact path='/' component={AllPinsPage} />
			<Route exact path='/mypins' component={MyPinsPage} />
			<Route exact path='/settings' component={SettingsPage} />
			<Route exact path='/login' component={LoginPage} />
			<Route exact path='/register' component={RegisterPage} />
			<Route exact path='/logout' component={Logout} />
			<Route path='*' component={NotFound} />
		</Switch>
	</div>
)

export default Main