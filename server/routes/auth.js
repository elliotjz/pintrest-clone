'user-strict'

const express = require('express')
const passport = require('passport')
const UserModel = require('../models/user')
const User = require('mongoose').model('User')


module.exports = function(app, passport) {

	let twitterAuthenticator = passport.authenticate("twitter")
	app.get("/auth/login", function(req,res) {
		console.log('logging in')
	  twitterAuthenticator(req, res)
	})

	app.get('/auth/twitter/callback', (req, res) => {
	  passport.authenticate('twitter', { failureRedirect: '/'}), 
	  function(req, res) {
	  	// Successful authentication, redirect home.
    	res.json(req.user)
	  }
	})
}
