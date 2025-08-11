const db = require('../_helpers/db');
const Evaluation = db.Evaluation;
const EvaluationAnswer = db.EvaluationAnswer;
const Teacher = db.Teacher;

exports.createEvaluation = async (req, res) => {
  try {
    const { teacherId, title, answers } = req.body;
    const studentId = req.user.id;

    if (!teacherId || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or answers' });
    }

    // Validate teacher exists
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(400).json({ message: 'Invalid teacherId' });
    }

    // Calculate average rating
    const averageRating = answers.reduce((sum, a) => sum + a.rating, 0) / answers.length;

    // Create evaluation record with average rating
    const evaluation = await Evaluation.create({ studentId, teacherId, title, averageRating });

    // Prepare answers data (each with optional long comment)
    const answersData = answers.map(a => ({
      evaluationId: evaluation.id,
      questionId: a.questionId,
      rating: a.rating,
      comment: a.comment || null
    }));

    // Bulk insert answers
    await EvaluationAnswer.bulkCreate(answersData);

    return res.status(201).json({ message: 'Evaluation submitted successfully', evaluationId: evaluation.id, averageRating });
  } catch (error) {
    console.error('Create evaluation error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
