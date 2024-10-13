const express = require('express')
const router = express.Router()
const queueController = require('../controllers/queueController')

router.get('/queue', queueController.getQueueData);

module.exports = router;