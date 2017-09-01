
class Helpers {

	static addLike(timeStamp) {
		const id = localStorage.getItem('id')
		let requestData = `id=${id}&timestamp=${timeStamp}`

		console.log('still need to add api call and backend functionality')
		const xhr = new XMLHttpRequest()
	  xhr.open('post', '/api/addlike')
	  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	  xhr.responseType = 'json'
	  xhr.addEventListener('load', () => {
	    if (xhr.status === 200) {
	      if (xhr.response.success) {
	      	console.log('success... response 200!')
				} else {
					console.log('no success')
					if (xhr.response.errorMessage) {
						console.log(xhr.response.errorMessage)
					}
				}
	    }

	  })
	  xhr.send(requestData)

		}
}

export default Helpers