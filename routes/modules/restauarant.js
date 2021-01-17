const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// restaurant detail
router.get('/:res_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.res_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit page
router.get('/:res_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.res_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:res_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.res_id
  const { name, name_en, category, image, location, phone, google_map, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${_id}`))
})

// delete page
router.get('/:res_id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.res_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('delete', { restaurant }))
    .catch(error => console.log(error))
})

router.delete('/:res_id', (req, res) => {
  const res_id = req.params.res_id
  const _id = req.body.answer
  const userId = req.user._id
  if (_id === '/detail') {
    return res.redirect(`/restaurant/${res_id}`)
  }

  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router