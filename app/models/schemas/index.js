const { sequelize } = require('../database.js');
const { Temperature2021, Temperature2022, Temperature2023, Temperature2024 } = require('./temperatureModel.js');
const { Pollution2021, Pollution2022, Pollution2023 } = require('./pollutionModel.js');
const { Precipitation2021, Precipitation2022, Precipitation2023 } = require('./precipitationModel.js');
const setupRelationships = require('./relationships.js');

// Initialize database and sync all models
const initializeDatabase = async () => {
  try {
    // Set up relationships between models
    setupRelationships();
    
    // Sync all models with the database without altering existing tables
    // Utilisez { force: false } pour éviter de supprimer les tables existantes
    // et { alter: false } pour éviter de les modifier
    await sequelize.sync({ force: false, alter: false });
    console.log('Database synchronized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

module.exports = {
  initializeDatabase,
  Temperature2021,
  Temperature2022,
  Temperature2023,
  Temperature2024,
  Pollution2021,
  Pollution2022,
  Pollution2023,
  Precipitation2021,
  Precipitation2022,
  Precipitation2023
};
