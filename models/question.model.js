module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionText: { type: DataTypes.STRING, allowNull: false },
    teacherId: { type: DataTypes.INTEGER, allowNull: true } // optional, if questions are teacher-specific
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
    Question.hasMany(models.EvaluationAnswer, { foreignKey: 'questionId' });
  };

  return Question;
};
