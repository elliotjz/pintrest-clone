import firebase from 'firebase'
import twitterConfig from './twitterConfig'

firebase.initializeApp(twitterConfig)

const twitterProvider = new firebase.auth.TwitterAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()

class Auth {

	static googleLogin(callback) {
		firebase.auth().signInWithPopup(googleProvider).then((result) => {
		  
		  localStorage.setItem('token', result.credential.accessToken)
			callback({
				user: result.user
			})
			console.log('logged in')

		}).catch((error) => {
		  
		  callback({
		  	errorMessage: error.code
		  })
		})
	}

	static twitterLogin(callback) {

		firebase.auth().signInWithPopup(twitterProvider).then((result) => {

			localStorage.setItem('token', result.credential.accessToken)
			callback({
				user: result.user
			})
			console.log('logged in')

		}).catch((error) => {
		  callback({
		  	errorMessage: error.code
		  })
		})
	}

	static logout(callback) {

		firebase.auth().signOut().then(function() {

		  localStorage.removeItem('token')
		  callback()

		}).catch(function(error) {
		  callback()
		})
	}
}

export default Auth