import { 
  Pollution2021, 
  Pollution2022, 
  Pollution2023 
} from '../models/schemas/index.js';
import { sequelize } from '../models/database.js';
import { QueryTypes } from 'sequelize';

class PollutionService {
  // Get all pollution data for a specific year
  async getAllByYear(year) {
    try {
      let model;
      switch (year) {
        case 2021:
          model = Pollution2021;
          break;
        case 2022:
          model = Pollution2022;
          break;
        case 2023:
          model = Pollution2023;
          break;
        default:
          throw new Error(`Invalid year: ${year}`);
      }
      
      return await model.findAll({
        order: [['province_code', 'ASC']]
      });
    } catch (error) {
      console.error('Error fetching pollution data:', error);
      throw error;
    }
  }

  // Get pollution data for a specific province and year
  async getByProvinceAndYear(provinceCode, year) {
    try {
      let model;
      switch (year) {
        case 2021:
          model = Pollution2021;
          break;
        case 2022:
          model = Pollution2022;
          break;
        case 2023:
          model = Pollution2023;
          break;
        default:
          throw new Error(`Invalid year: ${year}`);
      }
      
      return await model.findOne({
        where: { province_code: provinceCode }
      });
    } catch (error) {
      console.error('Error fetching pollution data for province:', error);
      throw error;
    }
  }

  // Find the most polluted month across all provinces for a given year range
  async getMostPollutedMonth(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH monthly_pollution AS (
          SELECT 
            'January' as month, 
            AVG(january) as avg_co2,
            1 as month_num
          FROM (
            SELECT january FROM pollution_2021
            UNION ALL
            SELECT january FROM pollution_2022
            UNION ALL
            SELECT january FROM pollution_2023
          ) jan
          UNION ALL
          SELECT 
            'February' as month, 
            AVG(february) as avg_co2,
            2 as month_num
          FROM (
            SELECT february FROM pollution_2021
            UNION ALL
            SELECT february FROM pollution_2022
            UNION ALL
            SELECT february FROM pollution_2023
          ) feb
          UNION ALL
          SELECT 
            'March' as month, 
            AVG(march) as avg_co2,
            3 as month_num
          FROM (
            SELECT march FROM pollution_2021
            UNION ALL
            SELECT march FROM pollution_2022
            UNION ALL
            SELECT march FROM pollution_2023
          ) mar
          UNION ALL
          SELECT 
            'April' as month, 
            AVG(april) as avg_co2,
            4 as month_num
          FROM (
            SELECT april FROM pollution_2021
            UNION ALL
            SELECT april FROM pollution_2022
            UNION ALL
            SELECT april FROM pollution_2023
          ) apr
          UNION ALL
          SELECT 
            'May' as month, 
            AVG(may) as avg_co2,
            5 as month_num
          FROM (
            SELECT may FROM pollution_2021
            UNION ALL
            SELECT may FROM pollution_2022
            UNION ALL
            SELECT may FROM pollution_2023
          ) may_data
          UNION ALL
          SELECT 
            'June' as month, 
            AVG(june) as avg_co2,
            6 as month_num
          FROM (
            SELECT june FROM pollution_2021
            UNION ALL
            SELECT june FROM pollution_2022
            UNION ALL
            SELECT june FROM pollution_2023
          ) jun
          UNION ALL
          SELECT 
            'July' as month, 
            AVG(july) as avg_co2,
            7 as month_num
          FROM (
            SELECT july FROM pollution_2021
            UNION ALL
            SELECT july FROM pollution_2022
            UNION ALL
            SELECT july FROM pollution_2023
          ) jul
          UNION ALL
          SELECT 
            'August' as month, 
            AVG(august) as avg_co2,
            8 as month_num
          FROM (
            SELECT august FROM pollution_2021
            UNION ALL
            SELECT august FROM pollution_2022
            UNION ALL
            SELECT august FROM pollution_2023
          ) aug
          UNION ALL
          SELECT 
            'September' as month, 
            AVG(september) as avg_co2,
            9 as month_num
          FROM (
            SELECT september FROM pollution_2021
            UNION ALL
            SELECT september FROM pollution_2022
            UNION ALL
            SELECT september FROM pollution_2023
          ) sep
          UNION ALL
          SELECT 
            'October' as month, 
            AVG(october) as avg_co2,
            10 as month_num
          FROM (
            SELECT october FROM pollution_2021
            UNION ALL
            SELECT october FROM pollution_2022
            UNION ALL
            SELECT october FROM pollution_2023
          ) oct
          UNION ALL
          SELECT 
            'November' as month, 
            AVG(november) as avg_co2,
            11 as month_num
          FROM (
            SELECT november FROM pollution_2021
            UNION ALL
            SELECT november FROM pollution_2022
            UNION ALL
            SELECT november FROM pollution_2023
          ) nov
          UNION ALL
          SELECT 
            'December' as month, 
            AVG(december) as avg_co2,
            12 as month_num
          FROM (
            SELECT december FROM pollution_2021
            UNION ALL
            SELECT december FROM pollution_2022
            UNION ALL
            SELECT december FROM pollution_2023
          ) dec
        )
        SELECT month, avg_co2
        FROM monthly_pollution
        ORDER BY avg_co2 DESC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding most polluted month:', error);
      throw error;
    }
  }

  // Find the least polluted month across all provinces for a given year range
  async getLeastPollutedMonth(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH monthly_pollution AS (
          SELECT 
            'January' as month, 
            AVG(january) as avg_co2,
            1 as month_num
          FROM (
            SELECT january FROM pollution_2021
            UNION ALL
            SELECT january FROM pollution_2022
            UNION ALL
            SELECT january FROM pollution_2023
          ) jan
          UNION ALL
          SELECT 
            'February' as month, 
            AVG(february) as avg_co2,
            2 as month_num
          FROM (
            SELECT february FROM pollution_2021
            UNION ALL
            SELECT february FROM pollution_2022
            UNION ALL
            SELECT february FROM pollution_2023
          ) feb
          UNION ALL
          SELECT 
            'March' as month, 
            AVG(march) as avg_co2,
            3 as month_num
          FROM (
            SELECT march FROM pollution_2021
            UNION ALL
            SELECT march FROM pollution_2022
            UNION ALL
            SELECT march FROM pollution_2023
          ) mar
          UNION ALL
          SELECT 
            'April' as month, 
            AVG(april) as avg_co2,
            4 as month_num
          FROM (
            SELECT april FROM pollution_2021
            UNION ALL
            SELECT april FROM pollution_2022
            UNION ALL
            SELECT april FROM pollution_2023
          ) apr
          UNION ALL
          SELECT 
            'May' as month, 
            AVG(may) as avg_co2,
            5 as month_num
          FROM (
            SELECT may FROM pollution_2021
            UNION ALL
            SELECT may FROM pollution_2022
            UNION ALL
            SELECT may FROM pollution_2023
          ) may_data
          UNION ALL
          SELECT 
            'June' as month, 
            AVG(june) as avg_co2,
            6 as month_num
          FROM (
            SELECT june FROM pollution_2021
            UNION ALL
            SELECT june FROM pollution_2022
            UNION ALL
            SELECT june FROM pollution_2023
          ) jun
          UNION ALL
          SELECT 
            'July' as month, 
            AVG(july) as avg_co2,
            7 as month_num
          FROM (
            SELECT july FROM pollution_2021
            UNION ALL
            SELECT july FROM pollution_2022
            UNION ALL
            SELECT july FROM pollution_2023
          ) jul
          UNION ALL
          SELECT 
            'August' as month, 
            AVG(august) as avg_co2,
            8 as month_num
          FROM (
            SELECT august FROM pollution_2021
            UNION ALL
            SELECT august FROM pollution_2022
            UNION ALL
            SELECT august FROM pollution_2023
          ) aug
          UNION ALL
          SELECT 
            'September' as month, 
            AVG(september) as avg_co2,
            9 as month_num
          FROM (
            SELECT september FROM pollution_2021
            UNION ALL
            SELECT september FROM pollution_2022
            UNION ALL
            SELECT september FROM pollution_2023
          ) sep
          UNION ALL
          SELECT 
            'October' as month, 
            AVG(october) as avg_co2,
            10 as month_num
          FROM (
            SELECT october FROM pollution_2021
            UNION ALL
            SELECT october FROM pollution_2022
            UNION ALL
            SELECT october FROM pollution_2023
          ) oct
          UNION ALL
          SELECT 
            'November' as month, 
            AVG(november) as avg_co2,
            11 as month_num
          FROM (
            SELECT november FROM pollution_2021
            UNION ALL
            SELECT november FROM pollution_2022
            UNION ALL
            SELECT november FROM pollution_2023
          ) nov
          UNION ALL
          SELECT 
            'December' as month, 
            AVG(december) as avg_co2,
            12 as month_num
          FROM (
            SELECT december FROM pollution_2021
            UNION ALL
            SELECT december FROM pollution_2022
            UNION ALL
            SELECT december FROM pollution_2023
          ) dec
        )
        SELECT month, avg_co2
        FROM monthly_pollution
        ORDER BY avg_co2 ASC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding least polluted month:', error);
      throw error;
    }
  }

  // Find the most polluted province across all years
  async getMostPollutedProvince(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH province_pollution AS (
          SELECT 
            p.province_code,
            p.province_name,
            AVG(
              (p.january + p.february + p.march + p.april + p.may + p.june + 
               p.july + p.august + p.september + p.october + p.november + p.december) / 12
            ) as avg_annual_co2
          FROM (
            SELECT * FROM pollution_2021
            UNION ALL
            SELECT * FROM pollution_2022
            UNION ALL
            SELECT * FROM pollution_2023
          ) p
          GROUP BY p.province_code, p.province_name
        )
        SELECT province_code, province_name, avg_annual_co2
        FROM province_pollution
        ORDER BY avg_annual_co2 DESC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding most polluted province:', error);
      throw error;
    }
  }

  // Find the least polluted province across all years
  async getLeastPollutedProvince(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH province_pollution AS (
          SELECT 
            p.province_code,
            p.province_name,
            AVG(
              (p.january + p.february + p.march + p.april + p.may + p.june + 
               p.july + p.august + p.september + p.october + p.november + p.december) / 12
            ) as avg_annual_co2
          FROM (
            SELECT * FROM pollution_2021
            UNION ALL
            SELECT * FROM pollution_2022
            UNION ALL
            SELECT * FROM pollution_2023
          ) p
          GROUP BY p.province_code, p.province_name
        )
        SELECT province_code, province_name, avg_annual_co2
        FROM province_pollution
        ORDER BY avg_annual_co2 ASC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding least polluted province:', error);
      throw error;
    }
  }
}

export default new PollutionService();
