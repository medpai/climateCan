import { NextResponse } from 'next/server';
import temperatureService from '../../services/temperatureService';
import pollutionService from '../../services/pollutionService';
import precipitationService from '../../services/precipitationService';
import { sequelize } from '../../models/database';
import { QueryTypes } from 'sequelize';

// API pour l'analyse des données climatiques
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') || '2023';
    const analysisType = searchParams.get('type') || 'correlation';
    const province = searchParams.get('province');
    
    let result = {};
    
    switch (analysisType) {
      case 'correlation':
        // Analyse de corrélation entre température et pollution
        if (province) {
          // Pour une province spécifique
          const tempData = await temperatureService.getTemperaturesByProvinceAndYear(province, year);
          const pollData = await pollutionService.getPollutionByProvinceAndYear(province, year);
          const precipData = await precipitationService.getPrecipitationByProvinceAndYear(province, year);
          
          result = {
            province,
            year,
            correlations: calculateCorrelations(tempData, pollData, precipData)
          };
        } else {
          // Pour toutes les provinces
          const provinces = ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU'];
          const allCorrelations = [];
          
          for (const prov of provinces) {
            const tempData = await temperatureService.getTemperaturesByProvinceAndYear(prov, year);
            const pollData = await pollutionService.getPollutionByProvinceAndYear(prov, year);
            const precipData = await precipitationService.getPrecipitationByProvinceAndYear(prov, year);
            
            allCorrelations.push({
              province: prov,
              correlations: calculateCorrelations(tempData, pollData, precipData)
            });
          }
          
          result = {
            year,
            provinceCorrelations: allCorrelations
          };
        }
        break;
        
      case 'trends':
        // Analyse des tendances (comparaison entre années)
        const years = ['2021', '2022', '2023'];
        const trends = {};
        
        if (province) {
          // Tendances pour une province spécifique
          for (const yr of years) {
            const tempData = await temperatureService.getTemperaturesByProvinceAndYear(province, yr);
            const pollData = await pollutionService.getPollutionByProvinceAndYear(province, yr);
            const precipData = await precipitationService.getPrecipitationByProvinceAndYear(province, yr);
            
            trends[yr] = {
              temperature: calculateAnnualAverage(tempData),
              pollution: calculateAnnualAverage(pollData),
              precipitation: calculateAnnualAverage(precipData)
            };
          }
          
          result = {
            province,
            trends
          };
        } else {
          // Tendances nationales (moyenne de toutes les provinces)
          for (const yr of years) {
            const tempData = await temperatureService.getTemperaturesByYear(yr);
            const pollData = await pollutionService.getPollutionByYear(yr);
            const precipData = await precipitationService.getPrecipitationByYear(yr);
            
            trends[yr] = {
              temperature: calculateNationalAverage(tempData),
              pollution: calculateNationalAverage(pollData),
              precipitation: calculateNationalAverage(precipData)
            };
          }
          
          result = {
            trends
          };
        }
        break;
        
      default:
        throw new Error('Type d\'analyse non pris en charge');
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Erreur lors de l\'analyse des données:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'analyse des données: ' + error.message },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour calculer les corrélations
function calculateCorrelations(tempData, pollData, precipData) {
  // Dans une application réelle, cette fonction calculerait la corrélation statistique
  // Pour la démo, nous retournons des valeurs simulées
  return {
    tempVsPollution: {
      coefficient: Math.random() * 0.8 - 0.4,  // Valeur entre -0.4 et 0.4
      description: 'Corrélation entre température et émissions de CO2'
    },
    tempVsPrecipitation: {
      coefficient: Math.random() * 0.7 - 0.35, // Valeur entre -0.35 et 0.35
      description: 'Corrélation entre température et précipitations'
    },
    pollutionVsPrecipitation: {
      coefficient: Math.random() * 0.5 - 0.25, // Valeur entre -0.25 et 0.25
      description: 'Corrélation entre émissions de CO2 et précipitations'
    }
  };
}

// Fonction utilitaire pour calculer la moyenne annuelle
function calculateAnnualAverage(data) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
  
  // Dans un vrai scénario, nous calculerions la moyenne des valeurs mensuelles
  // Pour la démo, on retourne une valeur simulée
  return {
    average: Math.random() * 20 - 5, // Valeur moyenne entre -5 et 15
    change: Math.random() * 4 - 2    // Changement entre -2 et 2
  };
}

// Fonction utilitaire pour calculer la moyenne nationale
function calculateNationalAverage(data) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
  
  // Dans un vrai scénario, nous calculerions la moyenne des valeurs de toutes les provinces
  // Pour la démo, on retourne une valeur simulée
  return {
    average: Math.random() * 20 - 5, // Valeur moyenne entre -5 et 15
    change: Math.random() * 4 - 2    // Changement entre -2 et 2
  };
}
