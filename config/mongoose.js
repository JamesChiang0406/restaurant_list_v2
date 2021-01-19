const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

// connect to mongoDB and set state
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {   // connect error
  console.log('mongodb error!')
})

db.once('open', () => {  // connect success
  console.log('mongodb connected')
})

module.exports = db