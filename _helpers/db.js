const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize'); // ✅ Include DataTypes

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Teacher = require('../models/teacher.model')(sequelize, DataTypes);

    // ADD your new models here:
    db.Evaluation = require('../models/evaluation.model')(sequelize, DataTypes);
    db.EvaluationAnswer = require('../models/evaluationAnswer.model')(sequelize, DataTypes);
    db.Question = require('../models/question.model')(sequelize, DataTypes);

    // define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    db.Teacher.hasMany(db.Evaluation, { foreignKey: 'teacherId' });
    db.Evaluation.belongsTo(db.Teacher, { foreignKey: 'teacherId' });

    db.Evaluation.hasMany(db.EvaluationAnswer, { foreignKey: 'evaluationId', as: 'answers' });
    db.EvaluationAnswer.belongsTo(db.Evaluation, { foreignKey: 'evaluationId' });

    db.Question.hasMany(db.EvaluationAnswer, { foreignKey: 'questionId' });
    db.EvaluationAnswer.belongsTo(db.Question, { foreignKey: 'questionId' });

    db.Question.belongsTo(db.Teacher, { foreignKey: 'teacherId' });
    db.Teacher.hasMany(db.Question, { foreignKey: 'teacherId' });

    // sync all models with database
    await sequelize.sync();
}
