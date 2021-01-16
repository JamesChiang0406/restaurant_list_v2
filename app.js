// require package used
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverrid = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000
const session = require('express-session')
const usePassport = require('./config/passport')
usePassport(app)

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files and body-parser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverrid('_method'))
app.use(routes)
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
