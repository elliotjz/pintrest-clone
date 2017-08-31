import firebase from 'firebase'
import twitterConfig from './twitterConfig'


function sendUserToServer(result, callback) {
	console.log('sending user to server')
	
	const id = result.user.uid
	const name = result.user.displayName
	let requestData = `id=${id}&name=${name}`

  const xhr = new XMLHttpRequest()
  xhr.open('post', '/api/createuser')
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.responseType = 'json'
  xhr.addEventListener('load', () => {
  	console.log('loaded')
    if (xhr.status === 200) {
      console.log('success... response 200!')
      localStorage.setItem('token', result.credential.accessToken)
      localStorage.setItem('id', result.user.uid)
			callback({
				user: result.user
			})
    }

  })
  xhr.send(requestData)
}


firebase.initializeApp(twitterConfig)

const twitterProvider = new firebase.auth.TwitterAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()

class Auth {

	static googleLogin(callback) {
		firebase.auth().signInWithPopup(googleProvider).then((result) => {
		  
			sendUserToServer(result, callback)

		}).catch((error) => {
		  
		  callback({
		  	errorMessage: error.code
		  })
		})
	}

	static twitterLogin(callback) {

		firebase.auth().signInWithPopup(twitterProvider).then((result) => {
			
			sendUserToServer(result, callback)

		}).catch((error) => {
		  
		  callback({
		  	errorMessage: error.code
		  })
		})


	}

	static logout(callback) {

		firebase.auth().signOut().then(function() {

		  localStorage.removeItem('token')
		  localStorage.removeItem('id')
		  callback()

		}).catch(function(error) {
		  callback()
		})
	}
}


export default Auth



