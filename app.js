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
const flash = require('connect-flash')

// setting session and passport and flash
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(flash())

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.loginErr = req.flash('loginErr')
  next()
})

// setting static files and body-parser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverrid('_method'))
app.use(routes)


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
