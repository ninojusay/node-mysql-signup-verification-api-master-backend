const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config.json');
const db = {};

// Set up Sequelize instance
const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
});

// Read all model files and import them dynamically
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')  // Exclude index.js itself
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Add the model to the db object
  });

// Add the Sequelize instance to the exported object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
