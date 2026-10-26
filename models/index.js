const { Sequelize } = require('sequelize');

// Connect to the SQLite file
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './ecommerce.sqlite',
  logging: false
});

// Load the Feedback model
const Feedback = require('./feedback')(sequelize);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('SQLite connected'))
  .catch(err => console.log(err));

module.exports = { sequelize, Feedback };
