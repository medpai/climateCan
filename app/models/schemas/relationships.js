const { Temperature2021, Temperature2022, Temperature2023, Temperature2024 } = require('./temperatureModel.js');
const { Pollution2021, Pollution2022, Pollution2023 } = require('./pollutionModel.js');
const { Precipitation2021, Precipitation2022, Precipitation2023 } = require('./precipitationModel.js');

// Define relationships between models
const setupRelationships = () => {
  // Relationships between temperature tables (year to year)
  Temperature2021.hasMany(Temperature2022, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Temperature2022.belongsTo(Temperature2021, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Temperature2022.hasMany(Temperature2023, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Temperature2023.belongsTo(Temperature2022, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Temperature2023.hasMany(Temperature2024, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Temperature2024.belongsTo(Temperature2023, { foreignKey: 'province_code', targetKey: 'province_code' });

  // Relationships between pollution tables (year to year)
  Pollution2021.hasMany(Pollution2022, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Pollution2022.belongsTo(Pollution2021, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Pollution2022.hasMany(Pollution2023, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Pollution2023.belongsTo(Pollution2022, { foreignKey: 'province_code', targetKey: 'province_code' });

  // Relationships between precipitation tables (year to year)
  Precipitation2021.hasMany(Precipitation2022, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2022.belongsTo(Precipitation2021, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Precipitation2022.hasMany(Precipitation2023, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2023.belongsTo(Precipitation2022, { foreignKey: 'province_code', targetKey: 'province_code' });

  // Cross-database relationships (for the same year)
  // 2021
  Temperature2021.hasMany(Pollution2021, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Pollution2021.belongsTo(Temperature2021, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Temperature2021.hasMany(Precipitation2021, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2021.belongsTo(Temperature2021, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Pollution2021.hasMany(Precipitation2021, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2021.belongsTo(Pollution2021, { foreignKey: 'province_code', targetKey: 'province_code' });

  // 2022
  Temperature2022.hasMany(Pollution2022, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Pollution2022.belongsTo(Temperature2022, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Temperature2022.hasMany(Precipitation2022, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2022.belongsTo(Temperature2022, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Pollution2022.hasMany(Precipitation2022, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2022.belongsTo(Pollution2022, { foreignKey: 'province_code', targetKey: 'province_code' });

  // 2023
  Temperature2023.hasMany(Pollution2023, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Pollution2023.belongsTo(Temperature2023, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Temperature2023.hasMany(Precipitation2023, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2023.belongsTo(Temperature2023, { foreignKey: 'province_code', targetKey: 'province_code' });
  
  Pollution2023.hasMany(Precipitation2023, { foreignKey: 'province_code', sourceKey: 'province_code' });
  Precipitation2023.belongsTo(Pollution2023, { foreignKey: 'province_code', targetKey: 'province_code' });
};

module.exports = setupRelationships;
