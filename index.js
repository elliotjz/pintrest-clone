'user strict'

const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require("express-session")
const Strategy = require("passport-twitter").Strategy
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const apiRoutes = require('./server/routes/api')

//Connect to DB
require('./server/models').connect(process.env.MLAB_URL)



// ------ APP --------
const app = express()

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, 'client/build')))



// -------- MIDDLEWARE ----------
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))



// ----------- ROUTES ----------
apiRoutes(app)

// Send requests to the react app
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})



// --------- LISTEN ----------
const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})





