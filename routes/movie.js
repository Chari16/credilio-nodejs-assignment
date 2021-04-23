const express = require('express')
const movieController = require('../controllers/movie');
 
const router = express.Router()

router.get('/', movieController.list)
router.get('/crawl', movieController.crawl)

module.exports = router;