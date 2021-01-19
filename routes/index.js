const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restauarant = require('./modules/restauarant')
const search = require('./modules/search')
const users = require('./modules/users')
const create = require('./modules/create')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/restaurant', authenticator, restauarant)
router.use('/create', authenticator, create)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

module.exports = router