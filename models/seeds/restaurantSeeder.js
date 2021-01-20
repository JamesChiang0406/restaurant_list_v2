if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')
const User = require('../user')

const user1 = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}
const user2 = {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}

db.once('open', () => {
  createUser(user1, 0, 2)
  createUser(user2, 3, 5)
})

function createUser(userData, dataStart, dataEnd) {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(userData.password, salt))
    .then(hash =>
      User.create({
        name: userData.name,
        email: userData.email,
        password: hash
      }))
    .then(user => {
      const userId = user._id
      for (let i = dataStart; i <= dataEnd; i++) {
        Restaurant.create({
          name: restaurantList.results[i].name,
          name_en: restaurantList.results[i].name_en,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId
        })
      }
    })
    .then(() => console.log(`${userData.name} done.`))
}