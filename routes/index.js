const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const resFunc = require('./modules/resFunc')

router.use('/', home)
router.use('/restaurant', resFunc)
router.use('/create', resFunc)

module.exports = router