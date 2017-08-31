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

	/*
	app.get("/auth/twitter/callback", function(req, res, next){
	  authenticateNewUser(req, res, next)
	}, function(req, res){
	  newUser = {
	    id: req.user._json.id_str,
	    name: req.user.displayName,
	  }
	  UserModel.findOne({ id: newUser.id }, function(err, data) {
	    if (err) throw err
	    if (!data) {
	      let newUserDoc = UserModel(newUser).save(function(err, data) {
	        if (err) throw err
	      })
	    }
	    res.redirect('/')
	  })
	})*/
}
