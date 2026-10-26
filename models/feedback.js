const { DataTypes } = require('sequelize');

// SQLite table: standalone, no relation to the MongoDB entities
module.exports = (sequelize) => {
  const Feedback = sequelize.define('Feedback', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } }
  }, { timestamps: true });

  return Feedback;
};
