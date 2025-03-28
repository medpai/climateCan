import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

// Pollution model for 2021 (CO2 in megatonnes)
const Pollution2021 = sequelize.define('Pollution2021', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  province_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: 'Province code (NL, PE, NS, NB, QC, ON, MB, SK, AB, BC, YT, NT, NU)'
  },
  province_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Full province name'
  },
  january: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in January (Mt)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in February (Mt)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in March (Mt)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in April (Mt)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in May (Mt)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in June (Mt)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in July (Mt)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in August (Mt)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in September (Mt)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in October (Mt)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in November (Mt)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in December (Mt)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2021,
    comment: 'Year of data'
  }
}, {
  tableName: 'pollution_2021',
  timestamps: true
});

// Pollution model for 2022 (CO2 in megatonnes)
const Pollution2022 = sequelize.define('Pollution2022', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  province_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: 'Province code (NL, PE, NS, NB, QC, ON, MB, SK, AB, BC, YT, NT, NU)'
  },
  province_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Full province name'
  },
  january: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in January (Mt)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in February (Mt)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in March (Mt)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in April (Mt)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in May (Mt)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in June (Mt)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in July (Mt)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in August (Mt)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in September (Mt)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in October (Mt)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in November (Mt)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in December (Mt)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2022,
    comment: 'Year of data'
  }
}, {
  tableName: 'pollution_2022',
  timestamps: true
});

// Pollution model for 2023 (CO2 in megatonnes)
const Pollution2023 = sequelize.define('Pollution2023', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  province_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: 'Province code (NL, PE, NS, NB, QC, ON, MB, SK, AB, BC, YT, NT, NU)'
  },
  province_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Full province name'
  },
  january: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in January (Mt)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in February (Mt)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in March (Mt)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in April (Mt)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in May (Mt)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in June (Mt)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in July (Mt)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in August (Mt)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in September (Mt)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in October (Mt)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in November (Mt)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average CO2 emissions in December (Mt)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2023,
    comment: 'Year of data'
  }
}, {
  tableName: 'pollution_2023',
  timestamps: true
});

export { Pollution2021, Pollution2022, Pollution2023 };
