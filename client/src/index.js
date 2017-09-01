
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { grey800, grey50, blue300 } from 'material-ui/styles/colors'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './main.css'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey800,
    textColor: grey50,
    alternateTextColor: blue300,
  },
  appBar: {
    height: 50,
  },
})

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
    	<App />
    </BrowserRouter>
  </MuiThemeProvider>),
document.getElementById('root'))


