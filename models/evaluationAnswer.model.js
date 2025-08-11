module.exports = (sequelize, DataTypes) => {
  const EvaluationAnswer = sequelize.define('EvaluationAnswer', {
    evaluationId: { type: DataTypes.INTEGER, allowNull: false },
    questionId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    comment: { type: DataTypes.TEXT, allowNull: true }
  });

  EvaluationAnswer.associate = (models) => {
    EvaluationAnswer.belongsTo(models.Evaluation, { foreignKey: 'evaluationId' });
    EvaluationAnswer.belongsTo(models.Question, { foreignKey: 'questionId' });
  };

  return EvaluationAnswer;
};
