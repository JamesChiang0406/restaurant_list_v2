const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const { route } = require('./modules/resFunc')
const resFunc = require('./modules/resFunc')
const search = require('./modules/search')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurant', resFunc)
router.use('/create', resFunc)
router.use('/search', search)
router.use('/users', users)

module.exports = router