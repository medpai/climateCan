import { 
  Precipitation2021, 
  Precipitation2022, 
  Precipitation2023 
} from '../models/schemas/index.js';
import { sequelize } from '../models/database.js';
import { QueryTypes } from 'sequelize';

class PrecipitationService {
  // Get all precipitation data for a specific year
  async getAllByYear(year) {
    try {
      let model;
      switch (year) {
        case 2021:
          model = Precipitation2021;
          break;
        case 2022:
          model = Precipitation2022;
          break;
        case 2023:
          model = Precipitation2023;
          break;
        default:
          throw new Error(`Invalid year: ${year}`);
      }
      
      return await model.findAll({
        order: [['province_code', 'ASC']]
      });
    } catch (error) {
      console.error('Error fetching precipitation data:', error);
      throw error;
    }
  }

  // Get precipitation data for a specific province and year
  async getByProvinceAndYear(provinceCode, year) {
    try {
      let model;
      switch (year) {
        case 2021:
          model = Precipitation2021;
          break;
        case 2022:
          model = Precipitation2022;
          break;
        case 2023:
          model = Precipitation2023;
          break;
        default:
          throw new Error(`Invalid year: ${year}`);
      }
      
      return await model.findOne({
        where: { province_code: provinceCode }
      });
    } catch (error) {
      console.error('Error fetching precipitation data for province:', error);
      throw error;
    }
  }

  // Find the rainiest month across all provinces for a given year range
  async getRainiestMonth(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH monthly_precipitation AS (
          SELECT 
            'January' as month, 
            AVG(january) as avg_precip,
            1 as month_num
          FROM (
            SELECT january FROM precipitation_2021
            UNION ALL
            SELECT january FROM precipitation_2022
            UNION ALL
            SELECT january FROM precipitation_2023
          ) jan
          UNION ALL
          SELECT 
            'February' as month, 
            AVG(february) as avg_precip,
            2 as month_num
          FROM (
            SELECT february FROM precipitation_2021
            UNION ALL
            SELECT february FROM precipitation_2022
            UNION ALL
            SELECT february FROM precipitation_2023
          ) feb
          UNION ALL
          SELECT 
            'March' as month, 
            AVG(march) as avg_precip,
            3 as month_num
          FROM (
            SELECT march FROM precipitation_2021
            UNION ALL
            SELECT march FROM precipitation_2022
            UNION ALL
            SELECT march FROM precipitation_2023
          ) mar
          UNION ALL
          SELECT 
            'April' as month, 
            AVG(april) as avg_precip,
            4 as month_num
          FROM (
            SELECT april FROM precipitation_2021
            UNION ALL
            SELECT april FROM precipitation_2022
            UNION ALL
            SELECT april FROM precipitation_2023
          ) apr
          UNION ALL
          SELECT 
            'May' as month, 
            AVG(may) as avg_precip,
            5 as month_num
          FROM (
            SELECT may FROM precipitation_2021
            UNION ALL
            SELECT may FROM precipitation_2022
            UNION ALL
            SELECT may FROM precipitation_2023
          ) may_data
          UNION ALL
          SELECT 
            'June' as month, 
            AVG(june) as avg_precip,
            6 as month_num
          FROM (
            SELECT june FROM precipitation_2021
            UNION ALL
            SELECT june FROM precipitation_2022
            UNION ALL
            SELECT june FROM precipitation_2023
          ) jun
          UNION ALL
          SELECT 
            'July' as month, 
            AVG(july) as avg_precip,
            7 as month_num
          FROM (
            SELECT july FROM precipitation_2021
            UNION ALL
            SELECT july FROM precipitation_2022
            UNION ALL
            SELECT july FROM precipitation_2023
          ) jul
          UNION ALL
          SELECT 
            'August' as month, 
            AVG(august) as avg_precip,
            8 as month_num
          FROM (
            SELECT august FROM precipitation_2021
            UNION ALL
            SELECT august FROM precipitation_2022
            UNION ALL
            SELECT august FROM precipitation_2023
          ) aug
          UNION ALL
          SELECT 
            'September' as month, 
            AVG(september) as avg_precip,
            9 as month_num
          FROM (
            SELECT september FROM precipitation_2021
            UNION ALL
            SELECT september FROM precipitation_2022
            UNION ALL
            SELECT september FROM precipitation_2023
          ) sep
          UNION ALL
          SELECT 
            'October' as month, 
            AVG(october) as avg_precip,
            10 as month_num
          FROM (
            SELECT october FROM precipitation_2021
            UNION ALL
            SELECT october FROM precipitation_2022
            UNION ALL
            SELECT october FROM precipitation_2023
          ) oct
          UNION ALL
          SELECT 
            'November' as month, 
            AVG(november) as avg_precip,
            11 as month_num
          FROM (
            SELECT november FROM precipitation_2021
            UNION ALL
            SELECT november FROM precipitation_2022
            UNION ALL
            SELECT november FROM precipitation_2023
          ) nov
          UNION ALL
          SELECT 
            'December' as month, 
            AVG(december) as avg_precip,
            12 as month_num
          FROM (
            SELECT december FROM precipitation_2021
            UNION ALL
            SELECT december FROM precipitation_2022
            UNION ALL
            SELECT december FROM precipitation_2023
          ) dec
        )
        SELECT month, avg_precip
        FROM monthly_precipitation
        ORDER BY avg_precip DESC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding rainiest month:', error);
      throw error;
    }
  }

  // Find the driest month across all provinces for a given year range
  async getDriestMonth(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH monthly_precipitation AS (
          SELECT 
            'January' as month, 
            AVG(january) as avg_precip,
            1 as month_num
          FROM (
            SELECT january FROM precipitation_2021
            UNION ALL
            SELECT january FROM precipitation_2022
            UNION ALL
            SELECT january FROM precipitation_2023
          ) jan
          UNION ALL
          SELECT 
            'February' as month, 
            AVG(february) as avg_precip,
            2 as month_num
          FROM (
            SELECT february FROM precipitation_2021
            UNION ALL
            SELECT february FROM precipitation_2022
            UNION ALL
            SELECT february FROM precipitation_2023
          ) feb
          UNION ALL
          SELECT 
            'March' as month, 
            AVG(march) as avg_precip,
            3 as month_num
          FROM (
            SELECT march FROM precipitation_2021
            UNION ALL
            SELECT march FROM precipitation_2022
            UNION ALL
            SELECT march FROM precipitation_2023
          ) mar
          UNION ALL
          SELECT 
            'April' as month, 
            AVG(april) as avg_precip,
            4 as month_num
          FROM (
            SELECT april FROM precipitation_2021
            UNION ALL
            SELECT april FROM precipitation_2022
            UNION ALL
            SELECT april FROM precipitation_2023
          ) apr
          UNION ALL
          SELECT 
            'May' as month, 
            AVG(may) as avg_precip,
            5 as month_num
          FROM (
            SELECT may FROM precipitation_2021
            UNION ALL
            SELECT may FROM precipitation_2022
            UNION ALL
            SELECT may FROM precipitation_2023
          ) may_data
          UNION ALL
          SELECT 
            'June' as month, 
            AVG(june) as avg_precip,
            6 as month_num
          FROM (
            SELECT june FROM precipitation_2021
            UNION ALL
            SELECT june FROM precipitation_2022
            UNION ALL
            SELECT june FROM precipitation_2023
          ) jun
          UNION ALL
          SELECT 
            'July' as month, 
            AVG(july) as avg_precip,
            7 as month_num
          FROM (
            SELECT july FROM precipitation_2021
            UNION ALL
            SELECT july FROM precipitation_2022
            UNION ALL
            SELECT july FROM precipitation_2023
          ) jul
          UNION ALL
          SELECT 
            'August' as month, 
            AVG(august) as avg_precip,
            8 as month_num
          FROM (
            SELECT august FROM precipitation_2021
            UNION ALL
            SELECT august FROM precipitation_2022
            UNION ALL
            SELECT august FROM precipitation_2023
          ) aug
          UNION ALL
          SELECT 
            'September' as month, 
            AVG(september) as avg_precip,
            9 as month_num
          FROM (
            SELECT september FROM precipitation_2021
            UNION ALL
            SELECT september FROM precipitation_2022
            UNION ALL
            SELECT september FROM precipitation_2023
          ) sep
          UNION ALL
          SELECT 
            'October' as month, 
            AVG(october) as avg_precip,
            10 as month_num
          FROM (
            SELECT october FROM precipitation_2021
            UNION ALL
            SELECT october FROM precipitation_2022
            UNION ALL
            SELECT october FROM precipitation_2023
          ) oct
          UNION ALL
          SELECT 
            'November' as month, 
            AVG(november) as avg_precip,
            11 as month_num
          FROM (
            SELECT november FROM precipitation_2021
            UNION ALL
            SELECT november FROM precipitation_2022
            UNION ALL
            SELECT november FROM precipitation_2023
          ) nov
          UNION ALL
          SELECT 
            'December' as month, 
            AVG(december) as avg_precip,
            12 as month_num
          FROM (
            SELECT december FROM precipitation_2021
            UNION ALL
            SELECT december FROM precipitation_2022
            UNION ALL
            SELECT december FROM precipitation_2023
          ) dec
        )
        SELECT month, avg_precip
        FROM monthly_precipitation
        ORDER BY avg_precip ASC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding driest month:', error);
      throw error;
    }
  }

  // Find the rainiest province across all years
  async getRainiestProvince(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH province_precipitation AS (
          SELECT 
            p.province_code,
            p.province_name,
            AVG(
              (p.january + p.february + p.march + p.april + p.may + p.june + 
               p.july + p.august + p.september + p.october + p.november + p.december) / 12
            ) as avg_annual_precip
          FROM (
            SELECT * FROM precipitation_2021
            UNION ALL
            SELECT * FROM precipitation_2022
            UNION ALL
            SELECT * FROM precipitation_2023
          ) p
          GROUP BY p.province_code, p.province_name
        )
        SELECT province_code, province_name, avg_annual_precip
        FROM province_precipitation
        ORDER BY avg_annual_precip DESC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding rainiest province:', error);
      throw error;
    }
  }

  // Find the driest province across all years
  async getDriestProvince(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH province_precipitation AS (
          SELECT 
            p.province_code,
            p.province_name,
            AVG(
              (p.january + p.february + p.march + p.april + p.may + p.june + 
               p.july + p.august + p.september + p.october + p.november + p.december) / 12
            ) as avg_annual_precip
          FROM (
            SELECT * FROM precipitation_2021
            UNION ALL
            SELECT * FROM precipitation_2022
            UNION ALL
            SELECT * FROM precipitation_2023
          ) p
          GROUP BY p.province_code, p.province_name
        )
        SELECT province_code, province_name, avg_annual_precip
        FROM province_precipitation
        ORDER BY avg_annual_precip ASC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding driest province:', error);
      throw error;
    }
  }
}

export default new PrecipitationService();
