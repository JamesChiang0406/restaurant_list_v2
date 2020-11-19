const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const { route } = require('./modules/resFunc')
const resFunc = require('./modules/resFunc')
const search = require('./modules/search')

router.use('/', home)
router.use('/restaurant', resFunc)
router.use('/create', resFunc)
router.use('/search', search)

module.exports = router