import { sequelize } from '../models/database.js';
import { QueryTypes } from 'sequelize';

class TemperatureService {
  // Get all temperature data for a specific year
  async getAllByYear(year) {
    try {
      // Ensure year is treated as a number
      const yearNum = parseInt(year, 10);
      
      // Validate year is within range
      if (yearNum < 2021 || yearNum > 2024) {
        throw new Error(`Invalid year: ${year}`);
      }
      
      // Use raw SQL query instead of the model
      const query = `
        SELECT *
        FROM temperature_${yearNum}
        ORDER BY province_code ASC
      `;
      
      const results = await sequelize.query(query, { 
        type: QueryTypes.SELECT 
      });
      
      return results;
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      throw error;
    }
  }

  // Get temperature data for a specific province and year
  async getByProvinceAndYear(provinceCode, year) {
    try {
      // Ensure year is treated as a number
      const yearNum = parseInt(year, 10);
      
      // Validate year is within range
      if (yearNum < 2021 || yearNum > 2024) {
        throw new Error(`Invalid year: ${year}`);
      }
      
      // Use raw SQL query instead of the model
      const query = `
        SELECT *
        FROM temperature_${yearNum}
        WHERE province_code = :provinceCode
      `;
      
      const results = await sequelize.query(query, { 
        type: QueryTypes.SELECT,
        replacements: { provinceCode }
      });
      
      return results[0] || null;
    } catch (error) {
      console.error('Error fetching temperature data for province:', error);
      throw error;
    }
  }

  // Find the warmest month across all provinces for a given year range
  async getWarmestMonth(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH monthly_temps AS (
          SELECT 
            'January' as month, 
            AVG(january) as avg_temp,
            1 as month_num
          FROM (
            SELECT january FROM temperature_2021
            UNION ALL
            SELECT january FROM temperature_2022
            UNION ALL
            SELECT january FROM temperature_2023
          ) jan
          UNION ALL
          SELECT 
            'February' as month, 
            AVG(february) as avg_temp,
            2 as month_num
          FROM (
            SELECT february FROM temperature_2021
            UNION ALL
            SELECT february FROM temperature_2022
            UNION ALL
            SELECT february FROM temperature_2023
          ) feb
          UNION ALL
          SELECT 
            'March' as month, 
            AVG(march) as avg_temp,
            3 as month_num
          FROM (
            SELECT march FROM temperature_2021
            UNION ALL
            SELECT march FROM temperature_2022
            UNION ALL
            SELECT march FROM temperature_2023
          ) mar
          UNION ALL
          SELECT 
            'April' as month, 
            AVG(april) as avg_temp,
            4 as month_num
          FROM (
            SELECT april FROM temperature_2021
            UNION ALL
            SELECT april FROM temperature_2022
            UNION ALL
            SELECT april FROM temperature_2023
          ) apr
          UNION ALL
          SELECT 
            'May' as month, 
            AVG(may) as avg_temp,
            5 as month_num
          FROM (
            SELECT may FROM temperature_2021
            UNION ALL
            SELECT may FROM temperature_2022
            UNION ALL
            SELECT may FROM temperature_2023
          ) may_data
          UNION ALL
          SELECT 
            'June' as month, 
            AVG(june) as avg_temp,
            6 as month_num
          FROM (
            SELECT june FROM temperature_2021
            UNION ALL
            SELECT june FROM temperature_2022
            UNION ALL
            SELECT june FROM temperature_2023
          ) jun
          UNION ALL
          SELECT 
            'July' as month, 
            AVG(july) as avg_temp,
            7 as month_num
          FROM (
            SELECT july FROM temperature_2021
            UNION ALL
            SELECT july FROM temperature_2022
            UNION ALL
            SELECT july FROM temperature_2023
          ) jul
          UNION ALL
          SELECT 
            'August' as month, 
            AVG(august) as avg_temp,
            8 as month_num
          FROM (
            SELECT august FROM temperature_2021
            UNION ALL
            SELECT august FROM temperature_2022
            UNION ALL
            SELECT august FROM temperature_2023
          ) aug
          UNION ALL
          SELECT 
            'September' as month, 
            AVG(september) as avg_temp,
            9 as month_num
          FROM (
            SELECT september FROM temperature_2021
            UNION ALL
            SELECT september FROM temperature_2022
            UNION ALL
            SELECT september FROM temperature_2023
          ) sep
          UNION ALL
          SELECT 
            'October' as month, 
            AVG(october) as avg_temp,
            10 as month_num
          FROM (
            SELECT october FROM temperature_2021
            UNION ALL
            SELECT october FROM temperature_2022
            UNION ALL
            SELECT october FROM temperature_2023
          ) oct
          UNION ALL
          SELECT 
            'November' as month, 
            AVG(november) as avg_temp,
            11 as month_num
          FROM (
            SELECT november FROM temperature_2021
            UNION ALL
            SELECT november FROM temperature_2022
            UNION ALL
            SELECT november FROM temperature_2023
          ) nov
          UNION ALL
          SELECT 
            'December' as month, 
            AVG(december) as avg_temp,
            12 as month_num
          FROM (
            SELECT december FROM temperature_2021
            UNION ALL
            SELECT december FROM temperature_2022
            UNION ALL
            SELECT december FROM temperature_2023
          ) dec
        )
        SELECT month, avg_temp
        FROM monthly_temps
        ORDER BY avg_temp DESC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding warmest month:', error);
      throw error;
    }
  }

  // Find the coldest month across all provinces for a given year range
  async getColdestMonth(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH monthly_temps AS (
          SELECT 
            'January' as month, 
            AVG(january) as avg_temp,
            1 as month_num
          FROM (
            SELECT january FROM temperature_2021
            UNION ALL
            SELECT january FROM temperature_2022
            UNION ALL
            SELECT january FROM temperature_2023
          ) jan
          UNION ALL
          SELECT 
            'February' as month, 
            AVG(february) as avg_temp,
            2 as month_num
          FROM (
            SELECT february FROM temperature_2021
            UNION ALL
            SELECT february FROM temperature_2022
            UNION ALL
            SELECT february FROM temperature_2023
          ) feb
          UNION ALL
          SELECT 
            'March' as month, 
            AVG(march) as avg_temp,
            3 as month_num
          FROM (
            SELECT march FROM temperature_2021
            UNION ALL
            SELECT march FROM temperature_2022
            UNION ALL
            SELECT march FROM temperature_2023
          ) mar
          UNION ALL
          SELECT 
            'April' as month, 
            AVG(april) as avg_temp,
            4 as month_num
          FROM (
            SELECT april FROM temperature_2021
            UNION ALL
            SELECT april FROM temperature_2022
            UNION ALL
            SELECT april FROM temperature_2023
          ) apr
          UNION ALL
          SELECT 
            'May' as month, 
            AVG(may) as avg_temp,
            5 as month_num
          FROM (
            SELECT may FROM temperature_2021
            UNION ALL
            SELECT may FROM temperature_2022
            UNION ALL
            SELECT may FROM temperature_2023
          ) may_data
          UNION ALL
          SELECT 
            'June' as month, 
            AVG(june) as avg_temp,
            6 as month_num
          FROM (
            SELECT june FROM temperature_2021
            UNION ALL
            SELECT june FROM temperature_2022
            UNION ALL
            SELECT june FROM temperature_2023
          ) jun
          UNION ALL
          SELECT 
            'July' as month, 
            AVG(july) as avg_temp,
            7 as month_num
          FROM (
            SELECT july FROM temperature_2021
            UNION ALL
            SELECT july FROM temperature_2022
            UNION ALL
            SELECT july FROM temperature_2023
          ) jul
          UNION ALL
          SELECT 
            'August' as month, 
            AVG(august) as avg_temp,
            8 as month_num
          FROM (
            SELECT august FROM temperature_2021
            UNION ALL
            SELECT august FROM temperature_2022
            UNION ALL
            SELECT august FROM temperature_2023
          ) aug
          UNION ALL
          SELECT 
            'September' as month, 
            AVG(september) as avg_temp,
            9 as month_num
          FROM (
            SELECT september FROM temperature_2021
            UNION ALL
            SELECT september FROM temperature_2022
            UNION ALL
            SELECT september FROM temperature_2023
          ) sep
          UNION ALL
          SELECT 
            'October' as month, 
            AVG(october) as avg_temp,
            10 as month_num
          FROM (
            SELECT october FROM temperature_2021
            UNION ALL
            SELECT october FROM temperature_2022
            UNION ALL
            SELECT october FROM temperature_2023
          ) oct
          UNION ALL
          SELECT 
            'November' as month, 
            AVG(november) as avg_temp,
            11 as month_num
          FROM (
            SELECT november FROM temperature_2021
            UNION ALL
            SELECT november FROM temperature_2022
            UNION ALL
            SELECT november FROM temperature_2023
          ) nov
          UNION ALL
          SELECT 
            'December' as month, 
            AVG(december) as avg_temp,
            12 as month_num
          FROM (
            SELECT december FROM temperature_2021
            UNION ALL
            SELECT december FROM temperature_2022
            UNION ALL
            SELECT december FROM temperature_2023
          ) dec
        )
        SELECT month, avg_temp
        FROM monthly_temps
        ORDER BY avg_temp ASC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding coldest month:', error);
      throw error;
    }
  }

  // Find the warmest province across all years
  async getWarmestProvince(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH province_temps AS (
          SELECT 
            t.province_code,
            t.province_name,
            AVG(
              (t.january + t.february + t.march + t.april + t.may + t.june + 
               t.july + t.august + t.september + t.october + t.november + t.december) / 12
            ) as avg_annual_temp
          FROM (
            SELECT * FROM temperature_2021
            UNION ALL
            SELECT * FROM temperature_2022
            UNION ALL
            SELECT * FROM temperature_2023
          ) t
          GROUP BY t.province_code, t.province_name
        )
        SELECT province_code, province_name, avg_annual_temp
        FROM province_temps
        ORDER BY avg_annual_temp DESC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding warmest province:', error);
      throw error;
    }
  }

  // Find the coldest province across all years
  async getColdestProvince(startYear = 2021, endYear = 2023) {
    try {
      const query = `
        WITH province_temps AS (
          SELECT 
            t.province_code,
            t.province_name,
            AVG(
              (t.january + t.february + t.march + t.april + t.may + t.june + 
               t.july + t.august + t.september + t.october + t.november + t.december) / 12
            ) as avg_annual_temp
          FROM (
            SELECT * FROM temperature_2021
            UNION ALL
            SELECT * FROM temperature_2022
            UNION ALL
            SELECT * FROM temperature_2023
          ) t
          GROUP BY t.province_code, t.province_name
        )
        SELECT province_code, province_name, avg_annual_temp
        FROM province_temps
        ORDER BY avg_annual_temp ASC
        LIMIT 1;
      `;
      
      const result = await sequelize.query(query, { type: QueryTypes.SELECT });
      return result[0] || null;
    } catch (error) {
      console.error('Error finding coldest province:', error);
      throw error;
    }
  }
}

export default new TemperatureService();
