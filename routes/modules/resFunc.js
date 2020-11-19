const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// restaurant detail
router.get('/:res_id', (req, res) => {
  const id = req.params.res_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit page
router.get('/:res_id/edit', (req, res) => {
  const id = req.params.res_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:res_id', (req, res) => {
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

// delete page
router.get('/:res_id/delete', (req, res) => {
  const id = req.params.res_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('delete', { restaurant }))
    .catch(error => console.log(error))
})

router.delete('/:res_id', (req, res) => {
  const id = req.body.answer
  if (id === '/') {
    return res.redirect('/')
  }

  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// create page
router.get('/', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
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

module.exports = router