const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluation.controller');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');

// Protect the create route so only Admin can access
router.post('/create', authorize(Role.Admin), evaluationController.createEvaluation);

module.exports = router;
