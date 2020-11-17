const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 1; i <= restaurantList.results.length; i++) {
    Restaurant.create({
      name: restaurantList.results[i - 1].name,
      name_en: restaurantList.results[i - 1].name_en,
      category: restaurantList.results[i - 1].category,
      image: restaurantList.results[i - 1].image,
      location: restaurantList.results[i - 1].location,
      phone: restaurantList.results[i - 1].phone,
      google_map: restaurantList.results[i - 1].google_map,
      rating: restaurantList.results[i - 1].rating,
      description: restaurantList.results[i - 1].description
    })
  }
  console.log('done')
})