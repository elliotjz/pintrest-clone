const UserModel = require('../models/user')
const User = require('mongoose').model('User')


module.exports = function(app) {
	app.get('/api/data', (req, res) => {
		res.json({
			data: 'Message from API!'
		})
	})

	app.post('/api/createuser', (req, res) => {

		const userData = {
			id: req.body.id,
			name: name = req.body.name,
			pins: []
		}

		UserModel.findOne({ id: userData.id }, (err, data) => {
			if (err) throw err

			if (data) {
				if (data.name !== userData.name) {
					// CHANGE NAME ON DB
				}
			} else {
				// No user with this ID, so create user.
				const newUser = new User(userData)
				newUser.save((err) => {
					if (err) throw err
				})
			}
			res.json({
				success: true
			})
		})
	})

	app.get('/api/allPins', (req, res) => {
		// GET ALL PINS
	})

	app.get('/api/myPins', (req, res) => {
		// GET USER PINS
	})

	app.post('/api/newpin', (req, res) => {

		res.status(200).json({
			success: true
		})
	})
}