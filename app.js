// require package used
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files and body-parser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// connect to mongoDB and set state
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {   // connect error
  console.log('mongodb error!')
})

db.once('open', () => {  // connect success
  console.log('mongodb connected')
})

// route setting
// setting homepage
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// setting restaurant page
app.get('/restaurant/:res_id', (req, res) => {
  const id = req.params.res_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// setting restaurant add new page and how
app.get('/create', (req, res) => {
  return res.render('new')
})

app.post('/create/new', (req, res) => {
  const data = req.body
  return Restaurant.create({
    name: data.name,
    name_en: data.name_en,
    category: data.category,
    image: data.image,
    location: data.location,
    phone: data.phone,
    google_map: data.google_map,
    rating: data.rating,
    description: data.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// setting restaurant edit page and how
app.get('/restaurant/:res_id/edit', (req, res) => {
  const id = req.params.res_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurant/:res_id/edit', (req, res) => {
  const id = req.params.res_id
  const option = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = option.name
      restaurant.name_en = option.name_en
      restaurant.category = option.category
      restaurant.image = option.image
      restaurant.location = option.location
      restaurant.phone = option.phone
      restaurant.google_map = option.google_map
      restaurant.description = option.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
})

app.get('/restaurant/:res_id/delete', (req, res) => {
  const id = req.params.res_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('delete', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurant/:res_id/delete', (req, res) => {
  const id = req.body.answer
  if (id === '/') {
    return res.redirect('/')
  }

  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search restaurant
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchRestaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: searchRestaurants })

  if (searchRestaurants.length === 0) {
    res.render('index',)
  }
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
