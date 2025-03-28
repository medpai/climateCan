import { sequelize } from '../models/database.js';
import {
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
} from '../models/schemas/index.js';

// Sample data for Canadian provinces
const provinces = [
  { code: 'NL', name: 'Terre-Neuve-et-Labrador' },
  { code: 'PE', name: 'Île-du-Prince-Édouard' },
  { code: 'NS', name: 'Nouvelle-Écosse' },
  { code: 'NB', name: 'Nouveau-Brunswick' },
  { code: 'QC', name: 'Québec' },
  { code: 'ON', name: 'Ontario' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'Colombie-Britannique' },
  { code: 'YT', name: 'Yukon' },
  { code: 'NT', name: 'Territoires du Nord-Ouest' },
  { code: 'NU', name: 'Nunavut' }
];

class DataService {
  // Seed temperature data
  async seedTemperatureData() {
    try {
      // Clear existing data
      await Temperature2021.destroy({ where: {} });
      await Temperature2022.destroy({ where: {} });
      await Temperature2023.destroy({ where: {} });
      await Temperature2024.destroy({ where: {} });
      
      // Sample temperature data (values in °C)
      // These are placeholder values - in a real application, you would fetch this from Environment Canada
      for (const province of provinces) {
        // 2021 data
        await Temperature2021.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomTemperature(-25, 5, province.code),
          february: this.getRandomTemperature(-20, 8, province.code),
          march: this.getRandomTemperature(-15, 10, province.code),
          april: this.getRandomTemperature(-5, 15, province.code),
          may: this.getRandomTemperature(5, 20, province.code),
          june: this.getRandomTemperature(10, 25, province.code),
          july: this.getRandomTemperature(15, 30, province.code),
          august: this.getRandomTemperature(15, 28, province.code),
          september: this.getRandomTemperature(10, 25, province.code),
          october: this.getRandomTemperature(5, 18, province.code),
          november: this.getRandomTemperature(-5, 10, province.code),
          december: this.getRandomTemperature(-20, 5, province.code)
        });
        
        // 2022 data
        await Temperature2022.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomTemperature(-25, 5, province.code),
          february: this.getRandomTemperature(-20, 8, province.code),
          march: this.getRandomTemperature(-15, 10, province.code),
          april: this.getRandomTemperature(-5, 15, province.code),
          may: this.getRandomTemperature(5, 20, province.code),
          june: this.getRandomTemperature(10, 25, province.code),
          july: this.getRandomTemperature(15, 30, province.code),
          august: this.getRandomTemperature(15, 28, province.code),
          september: this.getRandomTemperature(10, 25, province.code),
          october: this.getRandomTemperature(5, 18, province.code),
          november: this.getRandomTemperature(-5, 10, province.code),
          december: this.getRandomTemperature(-20, 5, province.code)
        });
        
        // 2023 data
        await Temperature2023.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomTemperature(-25, 5, province.code),
          february: this.getRandomTemperature(-20, 8, province.code),
          march: this.getRandomTemperature(-15, 10, province.code),
          april: this.getRandomTemperature(-5, 15, province.code),
          may: this.getRandomTemperature(5, 20, province.code),
          june: this.getRandomTemperature(10, 25, province.code),
          july: this.getRandomTemperature(15, 30, province.code),
          august: this.getRandomTemperature(15, 28, province.code),
          september: this.getRandomTemperature(10, 25, province.code),
          october: this.getRandomTemperature(5, 18, province.code),
          november: this.getRandomTemperature(-5, 10, province.code),
          december: this.getRandomTemperature(-20, 5, province.code)
        });
        
        // 2024 data (partial year)
        await Temperature2024.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomTemperature(-25, 5, province.code),
          february: this.getRandomTemperature(-20, 8, province.code),
          march: this.getRandomTemperature(-15, 10, province.code),
          april: null,
          may: null,
          june: null,
          july: null,
          august: null,
          september: null,
          october: null,
          november: null,
          december: null
        });
      }
      
      console.log('Temperature data seeded successfully');
      return true;
    } catch (error) {
      console.error('Error seeding temperature data:', error);
      return false;
    }
  }
  
  // Seed pollution data
  async seedPollutionData() {
    try {
      // Clear existing data
      await Pollution2021.destroy({ where: {} });
      await Pollution2022.destroy({ where: {} });
      await Pollution2023.destroy({ where: {} });
      
      // Sample CO2 data (values in megatonnes)
      for (const province of provinces) {
        // 2021 data
        await Pollution2021.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomPollution(5, 50, province.code),
          february: this.getRandomPollution(5, 50, province.code),
          march: this.getRandomPollution(5, 50, province.code),
          april: this.getRandomPollution(5, 50, province.code),
          may: this.getRandomPollution(5, 50, province.code),
          june: this.getRandomPollution(5, 50, province.code),
          july: this.getRandomPollution(5, 50, province.code),
          august: this.getRandomPollution(5, 50, province.code),
          september: this.getRandomPollution(5, 50, province.code),
          october: this.getRandomPollution(5, 50, province.code),
          november: this.getRandomPollution(5, 50, province.code),
          december: this.getRandomPollution(5, 50, province.code)
        });
        
        // 2022 data
        await Pollution2022.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomPollution(5, 50, province.code),
          february: this.getRandomPollution(5, 50, province.code),
          march: this.getRandomPollution(5, 50, province.code),
          april: this.getRandomPollution(5, 50, province.code),
          may: this.getRandomPollution(5, 50, province.code),
          june: this.getRandomPollution(5, 50, province.code),
          july: this.getRandomPollution(5, 50, province.code),
          august: this.getRandomPollution(5, 50, province.code),
          september: this.getRandomPollution(5, 50, province.code),
          october: this.getRandomPollution(5, 50, province.code),
          november: this.getRandomPollution(5, 50, province.code),
          december: this.getRandomPollution(5, 50, province.code)
        });
        
        // 2023 data
        await Pollution2023.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomPollution(5, 50, province.code),
          february: this.getRandomPollution(5, 50, province.code),
          march: this.getRandomPollution(5, 50, province.code),
          april: this.getRandomPollution(5, 50, province.code),
          may: this.getRandomPollution(5, 50, province.code),
          june: this.getRandomPollution(5, 50, province.code),
          july: this.getRandomPollution(5, 50, province.code),
          august: this.getRandomPollution(5, 50, province.code),
          september: this.getRandomPollution(5, 50, province.code),
          october: this.getRandomPollution(5, 50, province.code),
          november: this.getRandomPollution(5, 50, province.code),
          december: this.getRandomPollution(5, 50, province.code)
        });
      }
      
      console.log('Pollution data seeded successfully');
      return true;
    } catch (error) {
      console.error('Error seeding pollution data:', error);
      return false;
    }
  }
  
  // Seed precipitation data
  async seedPrecipitationData() {
    try {
      // Clear existing data
      await Precipitation2021.destroy({ where: {} });
      await Precipitation2022.destroy({ where: {} });
      await Precipitation2023.destroy({ where: {} });
      
      // Sample precipitation data (values in mm)
      for (const province of provinces) {
        // 2021 data
        await Precipitation2021.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomPrecipitation(10, 200, province.code),
          february: this.getRandomPrecipitation(10, 200, province.code),
          march: this.getRandomPrecipitation(10, 200, province.code),
          april: this.getRandomPrecipitation(20, 250, province.code),
          may: this.getRandomPrecipitation(30, 300, province.code),
          june: this.getRandomPrecipitation(30, 300, province.code),
          july: this.getRandomPrecipitation(30, 300, province.code),
          august: this.getRandomPrecipitation(30, 300, province.code),
          september: this.getRandomPrecipitation(20, 250, province.code),
          october: this.getRandomPrecipitation(20, 250, province.code),
          november: this.getRandomPrecipitation(10, 200, province.code),
          december: this.getRandomPrecipitation(10, 200, province.code)
        });
        
        // 2022 data
        await Precipitation2022.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomPrecipitation(10, 200, province.code),
          february: this.getRandomPrecipitation(10, 200, province.code),
          march: this.getRandomPrecipitation(10, 200, province.code),
          april: this.getRandomPrecipitation(20, 250, province.code),
          may: this.getRandomPrecipitation(30, 300, province.code),
          june: this.getRandomPrecipitation(30, 300, province.code),
          july: this.getRandomPrecipitation(30, 300, province.code),
          august: this.getRandomPrecipitation(30, 300, province.code),
          september: this.getRandomPrecipitation(20, 250, province.code),
          october: this.getRandomPrecipitation(20, 250, province.code),
          november: this.getRandomPrecipitation(10, 200, province.code),
          december: this.getRandomPrecipitation(10, 200, province.code)
        });
        
        // 2023 data
        await Precipitation2023.create({
          province_code: province.code,
          province_name: province.name,
          january: this.getRandomPrecipitation(10, 200, province.code),
          february: this.getRandomPrecipitation(10, 200, province.code),
          march: this.getRandomPrecipitation(10, 200, province.code),
          april: this.getRandomPrecipitation(20, 250, province.code),
          may: this.getRandomPrecipitation(30, 300, province.code),
          june: this.getRandomPrecipitation(30, 300, province.code),
          july: this.getRandomPrecipitation(30, 300, province.code),
          august: this.getRandomPrecipitation(30, 300, province.code),
          september: this.getRandomPrecipitation(20, 250, province.code),
          october: this.getRandomPrecipitation(20, 250, province.code),
          november: this.getRandomPrecipitation(10, 200, province.code),
          december: this.getRandomPrecipitation(10, 200, province.code)
        });
      }
      
      console.log('Precipitation data seeded successfully');
      return true;
    } catch (error) {
      console.error('Error seeding precipitation data:', error);
      return false;
    }
  }
  
  // Helper method to generate random temperature values based on province
  getRandomTemperature(min, max, provinceCode) {
    // Adjust temperature ranges based on province location
    let adjustedMin = min;
    let adjustedMax = max;
    
    // Northern territories are colder
    if (['YT', 'NT', 'NU'].includes(provinceCode)) {
      adjustedMin -= 10;
      adjustedMax -= 10;
    }
    
    // Atlantic provinces have more moderate temperatures
    if (['NL', 'PE', 'NS', 'NB'].includes(provinceCode)) {
      adjustedMin += 2;
      adjustedMax -= 2;
    }
    
    // Prairie provinces have more extreme temperatures
    if (['MB', 'SK', 'AB'].includes(provinceCode)) {
      adjustedMin -= 5;
      adjustedMax += 5;
    }
    
    // BC has milder temperatures due to Pacific influence
    if (provinceCode === 'BC') {
      adjustedMin += 5;
      adjustedMax -= 3;
    }
    
    return parseFloat((Math.random() * (adjustedMax - adjustedMin) + adjustedMin).toFixed(1));
  }
  
  // Helper method to generate random pollution values based on province
  getRandomPollution(min, max, provinceCode) {
    // Adjust pollution ranges based on province industrialization
    let adjustedMin = min;
    let adjustedMax = max;
    
    // More industrialized provinces have higher pollution
    if (['ON', 'QC', 'AB'].includes(provinceCode)) {
      adjustedMin += 10;
      adjustedMax += 15;
    }
    
    // Less populated provinces have lower pollution
    if (['YT', 'NT', 'NU', 'PE'].includes(provinceCode)) {
      adjustedMin -= 3;
      adjustedMax -= 20;
    }
    
    return parseFloat((Math.random() * (adjustedMax - adjustedMin) + adjustedMin).toFixed(1));
  }
  
  // Helper method to generate random precipitation values based on province
  getRandomPrecipitation(min, max, provinceCode) {
    // Adjust precipitation ranges based on province climate
    let adjustedMin = min;
    let adjustedMax = max;
    
    // BC coast has higher precipitation
    if (provinceCode === 'BC') {
      adjustedMin += 50;
      adjustedMax += 100;
    }
    
    // Prairie provinces are drier
    if (['SK', 'AB', 'MB'].includes(provinceCode)) {
      adjustedMin -= 5;
      adjustedMax -= 50;
    }
    
    // Atlantic provinces have higher precipitation
    if (['NL', 'NS', 'NB', 'PE'].includes(provinceCode)) {
      adjustedMin += 20;
      adjustedMax += 50;
    }
    
    // Northern territories have lower precipitation
    if (['YT', 'NT', 'NU'].includes(provinceCode)) {
      adjustedMin -= 5;
      adjustedMax -= 80;
    }
    
    return parseFloat((Math.random() * (adjustedMax - adjustedMin) + adjustedMin).toFixed(1));
  }
  
  // Seed all data
  async seedAllData() {
    try {
      await this.seedTemperatureData();
      await this.seedPollutionData();
      await this.seedPrecipitationData();
      console.log('All data seeded successfully');
      return true;
    } catch (error) {
      console.error('Error seeding all data:', error);
      return false;
    }
  }
}

export default new DataService();
