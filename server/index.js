const express = require('express')
const path = require('path')

const app = express()




// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')))

// Send requests to the react app
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})


// Listen to port
const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
