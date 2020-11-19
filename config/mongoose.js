const mongoose = require('mongoose')

// connect to mongoDB and set state
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {   // connect error
  console.log('mongodb error!')
})

db.once('open', () => {  // connect success
  console.log('mongodb connected')
})

module.exports = db