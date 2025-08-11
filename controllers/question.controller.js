const db = require('../_helpers/db');
const Question = db.Question;

exports.createQuestion = async (req, res) => {
  try {
    const { questionText } = req.body;
    if (!questionText) {
      return res.status(400).json({ message: 'Question text is required' });
    }

    const question = await Question.create({ questionText });
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.questionText = req.body.questionText || question.questionText;
    await question.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.destroy();
    res.json({ message: 'Question deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
