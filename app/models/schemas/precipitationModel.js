import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

// Precipitation model for 2021 (in mm)
const Precipitation2021 = sequelize.define('Precipitation2021', {
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
    comment: 'Average precipitation in January (mm)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in February (mm)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in March (mm)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in April (mm)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in May (mm)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in June (mm)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in July (mm)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in August (mm)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in September (mm)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in October (mm)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in November (mm)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in December (mm)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2021,
    comment: 'Year of data'
  }
}, {
  tableName: 'precipitation_2021',
  timestamps: true
});

// Precipitation model for 2022 (in mm)
const Precipitation2022 = sequelize.define('Precipitation2022', {
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
    comment: 'Average precipitation in January (mm)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in February (mm)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in March (mm)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in April (mm)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in May (mm)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in June (mm)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in July (mm)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in August (mm)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in September (mm)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in October (mm)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in November (mm)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in December (mm)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2022,
    comment: 'Year of data'
  }
}, {
  tableName: 'precipitation_2022',
  timestamps: true
});

// Precipitation model for 2023 (in mm)
const Precipitation2023 = sequelize.define('Precipitation2023', {
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
    comment: 'Average precipitation in January (mm)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in February (mm)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in March (mm)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in April (mm)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in May (mm)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in June (mm)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in July (mm)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in August (mm)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in September (mm)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in October (mm)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in November (mm)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average precipitation in December (mm)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2023,
    comment: 'Year of data'
  }
}, {
  tableName: 'precipitation_2023',
  timestamps: true
});

export { Precipitation2021, Precipitation2022, Precipitation2023 };
