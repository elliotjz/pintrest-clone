const UserModel = require('../models/user')
const User = require('mongoose').model('User')


module.exports = function(app) {

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


	app.get('/api/allpins', (req, res) => {
		UserModel.find({}, (err, users) => {
			if (err) throw err
			if (!users) {
				return res.status(200).json({
					pins: []
				})
			}

			let pins = []
			users.forEach((user) => {
				if (user.pins.length > 0) {
					user.pins.forEach((pin) => {
						pins.push(pin)
					})
				}
			})

			pins.sort((a, b) => {
				return b.timeStamp - a.timeStamp
			})

			return res.status(200).json({
				success: true,
				pins
			})
		})
	})


	app.get('/api/mypins', (req, res) => {

		UserModel.findOne({ id: req.headers.id }, (err, user) => {
			if (err) throw err
			if (!user) {
				return res.status(200).json({
					success: false,
					errorMessage: 'Couldn\'t find user in database'
				})
			}

			let pins = []
			if (user.pins && user.pins.length > 0) {
				user.pins.forEach((pin) => {
					pins.push(pin)
				})
			}

			pins.sort((a, b) => {
				return b.timeStamp - a.timeStamp
			})
			
			return res.status(200).json({
				success: true,
				pins
			})

		})
	})

	app.post('/api/newpin', (req, res) => {
		
		UserModel.findOne({ id: req.body.id }, (err, user) => {
			if (err) throw err
			if (!user) {
				res.status(200).json({
					success: false,
					errorMessage: 'Couldn\'t find user in database'
				})
			}

			let pin = {
				url: req.body.url,
				description: req.body.description,
				likes: [],
				timeStamp: Date.now()
			}
			user.pins.push(pin)
			user.save((err) => {
				if (err) throw err
			})

			res.status(200).json({
				success: true
			})
		}) // End UserModel.findOne
		
	}) // End /api/newpin
}




