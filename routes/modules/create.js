const express = require('express')
const { route } = require('./users')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId: req.user._id
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router