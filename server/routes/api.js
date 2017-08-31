const UserModel = require('../models/user')
const User = require('mongoose').model('User')


module.exports = function(app) {
	app.get('/api/data', (req, res) => {
		res.json({
			data: 'Message from API!'
		})
	})

	app.post('api/createUser', (req, res) => {
		// REGISTER USER
	})

	app.get('api/allPins', (req, res) => {
		// GET ALL PINS
	})

	app.get('api/myPins', (req, res) => {
		// GET USER PINS
	})
}