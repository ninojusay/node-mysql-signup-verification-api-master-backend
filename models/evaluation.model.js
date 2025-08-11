module.exports = (sequelize, DataTypes) => {
  const Evaluation = sequelize.define('Evaluation', {
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    teacherId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: true },
    averageRating: { type: DataTypes.FLOAT, allowNull: true }  // New field for average rating
  });

  Evaluation.associate = (models) => {
    Evaluation.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
    Evaluation.hasMany(models.EvaluationAnswer, { foreignKey: 'evaluationId', as: 'answers' });
  };

  return Evaluation;
};
