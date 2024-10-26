const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/answers', answerController.getQuestionsAndAnswers);
router.post('/answers/add', answerController.addAnswer);

module.exports = router;
