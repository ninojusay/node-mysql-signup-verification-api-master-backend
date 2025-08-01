const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the evaluation form schema
const evaluationSchema = new Schema({
  name: { type: String, required: true },
  criteria: { type: String, required: true },
  dueDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who created the form
  evaluationFile: { type: String },  // Path to the uploaded file
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model for the evaluation form
const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
