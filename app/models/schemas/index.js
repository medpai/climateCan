import { sequelize } from '../database.js';
import { Temperature2021, Temperature2022, Temperature2023, Temperature2024 } from './temperatureModel.js';
import { Pollution2021, Pollution2022, Pollution2023 } from './pollutionModel.js';
import { Precipitation2021, Precipitation2022, Precipitation2023 } from './precipitationModel.js';
import setupRelationships from './relationships.js';

// Initialize database and sync all models
const initializeDatabase = async () => {
  try {
    // Set up relationships between models
    setupRelationships();
    
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

export {
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
