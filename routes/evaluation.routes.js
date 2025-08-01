// routes/evaluation.routes.js
const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluation.controller');
const multer = require('multer'); // Import multer for file handling

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid duplication
  }
});
const upload = multer({ storage: storage });

// Define routes for evaluations

// Create a new evaluation form with file upload
router.post('/', upload.single('evaluationFile'), evaluationController.createEvaluation);  // 'evaluationFile' is the field name for file upload

// Get all evaluations
router.get('/', evaluationController.getEvaluations);

module.exports = router;
