const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const questionController = require('../controllers/question.controller');

router.post('/', authorize(Role.Admin), questionController.createQuestion);
router.get('/', authorize(Role.Admin), questionController.getQuestions);
router.put('/:id', authorize(Role.Admin), questionController.updateQuestion);
router.delete('/:id', authorize(Role.Admin), questionController.deleteQuestion);

module.exports = router;
