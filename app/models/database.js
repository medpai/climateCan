const { Sequelize } = require('sequelize');
const tedious = require('tedious'); // SQL Server driver

// Sequelize instance for SQL Server connection
const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectModule: tedious,
  host: 'LAPTOP-06KAIMHI', // Nom du serveur fourni
  username: 'climateuser', // Utilisateur fourni
  password: 'raja2020dima', // Mot de passe fourni
  database: 'climate_data', // Nom présumé de la base de données, à ajuster si différent
  port: 1433, // Port par défaut de SQL Server
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      instanceName: '' // À spécifier si vous utilisez une instance nommée
    }
  },
  define: {
    // Désactiver la modification automatique des noms de tables et colonnes
    freezeTableName: true,
    timestamps: false,
    underscored: false
  },
  logging: console.log // Utile pour déboguer, à mettre à false en production
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL Server connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to SQL Server:', error);
    return false;
  }
};

module.exports = { sequelize, testConnection };
