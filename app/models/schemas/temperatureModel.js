import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

// Temperature model for 2021
const Temperature2021 = sequelize.define('Temperature2021', {
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
    comment: 'Average temperature in January (°C)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in February (°C)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in March (°C)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in April (°C)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in May (°C)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in June (°C)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in July (°C)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in August (°C)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in September (°C)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in October (°C)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in November (°C)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in December (°C)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2021,
    comment: 'Year of data'
  }
}, {
  tableName: 'temperature_2021',
  timestamps: true
});

// Temperature model for 2022
const Temperature2022 = sequelize.define('Temperature2022', {
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
    comment: 'Average temperature in January (°C)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in February (°C)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in March (°C)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in April (°C)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in May (°C)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in June (°C)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in July (°C)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in August (°C)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in September (°C)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in October (°C)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in November (°C)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in December (°C)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2022,
    comment: 'Year of data'
  }
}, {
  tableName: 'temperature_2022',
  timestamps: true
});

// Temperature model for 2023
const Temperature2023 = sequelize.define('Temperature2023', {
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
    comment: 'Average temperature in January (°C)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in February (°C)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in March (°C)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in April (°C)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in May (°C)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in June (°C)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in July (°C)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in August (°C)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in September (°C)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in October (°C)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in November (°C)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in December (°C)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2023,
    comment: 'Year of data'
  }
}, {
  tableName: 'temperature_2023',
  timestamps: true
});

// Temperature model for 2024 (partial year)
const Temperature2024 = sequelize.define('Temperature2024', {
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
    comment: 'Average temperature in January (°C)'
  },
  february: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in February (°C)'
  },
  march: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in March (°C)'
  },
  april: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in April (°C)'
  },
  may: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in May (°C)'
  },
  june: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in June (°C)'
  },
  july: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in July (°C)'
  },
  august: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in August (°C)'
  },
  september: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in September (°C)'
  },
  october: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in October (°C)'
  },
  november: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in November (°C)'
  },
  december: {
    type: DataTypes.FLOAT,
    comment: 'Average temperature in December (°C)'
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2024,
    comment: 'Year of data'
  }
}, {
  tableName: 'temperature_2024',
  timestamps: true
});

export { Temperature2021, Temperature2022, Temperature2023, Temperature2024 };
