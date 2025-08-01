const Evaluation = require('../models/evaluation.model'); // The evaluation model

// Create a new evaluation form
exports.createEvaluation = async (req, res) => {
  try {
    const { name, criteria, dueDate, createdBy } = req.body;
    const evaluation = new Evaluation({
      name,
      criteria,
      dueDate,
      createdBy,
      evaluationFile: req.file ? req.file.path : null  // Store file path if uploaded
    });

    await evaluation.save();

    res.status(201).json({ message: 'Evaluation form created successfully', evaluation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create evaluation form' });
  }
};

// Get all evaluations
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch evaluations' });
  }
};
