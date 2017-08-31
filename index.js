'user strict'

const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require("express-session")
const Strategy = require("passport-twitter").Strategy
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const authRoutes = require('./server/routes/auth')
const apiRoutes = require('./server/routes/api')
const env = require('./env')

//Connect to DB
require('./server/models').connect(env.MLAB_URL || process.env.MLAB_URL)




/*

// ------ PASSPORT SETUP -------

// Configure passport Strategy
passport.use(new Strategy({
    consumerKey: env.CONSUMER_KEY || process.env.CONSUMER_KEY,
    consumerSecret: env.CONSUMER_SECRET || process.env.CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb){
      cb(null, profile)
  }   
))

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

*/



// ------ APP --------
const app = express()

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, 'client/build')))





// -------- MIDDLEWARE ----------
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
/*app.use(session({
  secret: env.SESSION_SECRET || process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))*/

// Initialize Passport
//app.use(passport.initialize());
//app.use(passport.session());





// ----------- ROUTES ----------
//authRoutes(app, passport)
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





