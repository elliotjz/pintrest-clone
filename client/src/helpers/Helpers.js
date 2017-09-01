
class Helpers {

	static addLike(timeStamp) {
		const id = localStorage.getItem('id')
		let requestData = `id=${id}&timestamp=${timeStamp}`

		const xhr = new XMLHttpRequest()
	  xhr.open('post', '/api/addlike')
	  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	  xhr.responseType = 'json'
	  xhr.addEventListener('load', () => {
	    if (xhr.status === 200) {
	      if (xhr.response.success) {
				} else {
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