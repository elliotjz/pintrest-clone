import React from 'react'
import AppBar from 'material-ui/AppBar'
import Menu from './components/Menu'


const Header = () => (
  <div>
    <AppBar
      title='Pintrest Clone'
      iconElementRight={<Menu/>}
      showMenuIconButton={false}
      id='app-bar'
    />
  </div>
)

export default Header