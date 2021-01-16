const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const { route } = require('./modules/restauarant')
const restauarant = require('./modules/restauarant')
const search = require('./modules/search')
const users = require('./modules/users')
const create = require('./modules/create')
const { authenticator } = require('../middleware/auth')

router.use('/restaurant', authenticator, restauarant)
router.use('/create', authenticator, create)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router