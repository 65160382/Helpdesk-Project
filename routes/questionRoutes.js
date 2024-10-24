const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route to show the question form
router.get('/question', questionController.getQuestion);

// Route to handle the question form submission
router.post('/questions/create', questionController.createQuestion);

module.exports = router;