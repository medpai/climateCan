'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';

export default function AnalysisPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState({});
  
  // Canadian provinces and territories
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
  
  // Months for labels
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  // Sample analysis data (in a real application, this would come from the API)
  useEffect(() => {
    // Simulate API call to fetch analysis data
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real application, this would be API calls to the stored procedures
        // const tempResponse = await fetch('/api/analysis/temperature');
        // const pollutionResponse = await fetch('/api/analysis/pollution');
        // const precipResponse = await fetch('/api/analysis/precipitation');
        
        // For now, we'll use sample data
        setTimeout(() => {
          const sampleData = generateSampleAnalysisData();
          setAnalysisData(sampleData);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate sample analysis data for demonstration
  const generateSampleAnalysisData = () => {
    return {
      temperature: {
        warmestMonth: {
          month: 'Juillet',
          temperature: 22.7,
          year: 2023
        },
        coldestMonth: {
          month: 'Janvier',
          temperature: -18.3,
          year: 2022
        },
        warmestProvince: {
          province: 'Colombie-Britannique',
          code: 'BC',
          temperature: 9.8
        },
        coldestProvince: {
          province: 'Nunavut',
          code: 'NU',
          temperature: -12.4
        },
        monthlyAverages: [
          { month: 'Janvier', value: -15.2 },
          { month: 'Février', value: -12.8 },
          { month: 'Mars', value: -6.5 },
          { month: 'Avril', value: 2.3 },
          { month: 'Mai', value: 9.7 },
          { month: 'Juin', value: 15.8 },
          { month: 'Juillet', value: 22.7 },
          { month: 'Août', value: 21.3 },
          { month: 'Septembre', value: 15.6 },
          { month: 'Octobre', value: 8.2 },
          { month: 'Novembre', value: -1.4 },
          { month: 'Décembre', value: -10.7 }
        ]
      },
      pollution: {
        mostPollutedMonth: {
          month: 'Décembre',
          pollution: 38.2,
          year: 2021
        },
        leastPollutedMonth: {
          month: 'Mai',
          pollution: 22.6,
          year: 2023
        },
        mostPollutedProvince: {
          province: 'Ontario',
          code: 'ON',
          pollution: 42.5
        },
        leastPollutedProvince: {
          province: 'Nunavut',
          code: 'NU',
          pollution: 1.2
        },
        provinceRankings: provinces.map(province => {
          let baseValue;
          
          // More industrialized provinces have higher pollution
          if (['ON', 'QC', 'AB'].includes(province.code)) {
            baseValue = 30 + Math.random() * 15;
          } 
          // Medium pollution provinces
          else if (['BC', 'MB', 'SK', 'NS', 'NB'].includes(province.code)) {
            baseValue = 15 + Math.random() * 10;
          }
          // Less populated provinces have lower pollution
          else {
            baseValue = 1 + Math.random() * 7;
          }
          
          return {
            province: province.name,
            code: province.code,
            value: parseFloat(baseValue.toFixed(1))
          };
        }).sort((a, b) => b.value - a.value)
      },
      precipitation: {
        rainiestMonth: {
          month: 'Novembre',
          precipitation: 152.8,
          year: 2023
        },
        driestMonth: {
          month: 'Février',
          precipitation: 18.5,
          year: 2022
        },
        rainiestProvince: {
          province: 'Colombie-Britannique',
          code: 'BC',
          precipitation: 128.4
        },
        driestProvince: {
          province: 'Nunavut',
          code: 'NU',
          precipitation: 22.7
        },
        monthlyAverages: [
          { month: 'Janvier', value: 68.5 },
          { month: 'Février', value: 58.2 },
          { month: 'Mars', value: 62.7 },
          { month: 'Avril', value: 72.3 },
          { month: 'Mai', value: 78.6 },
          { month: 'Juin', value: 82.4 },
          { month: 'Juillet', value: 76.8 },
          { month: 'Août', value: 74.5 },
          { month: 'Septembre', value: 85.2 },
          { month: 'Octobre', value: 92.7 },
          { month: 'Novembre', value: 105.3 },
          { month: 'Décembre', value: 88.6 }
        ]
      }
    };
  };
  
  // Prepare data for temperature monthly chart
  const getTemperatureMonthlyChartData = () => {
    if (!analysisData.temperature) return { labels: months, datasets: [] };
    
    const monthlyData = analysisData.temperature.monthlyAverages || [];
    
    return {
      labels: monthlyData.map(item => item.month),
      datasets: [
        {
          label: 'Température moyenne (°C)',
          data: monthlyData.map(item => item.value),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    };
  };
  
  // Prepare data for pollution province chart
  const getPollutionProvinceChartData = () => {
    if (!analysisData.pollution) return { labels: [], datasets: [] };
    
    const provinceData = analysisData.pollution.provinceRankings || [];
    
    // Generate colors based on pollution level (higher = more intense purple)
    const backgroundColors = provinceData.map(item => {
      const intensity = Math.min(1, item.value / 40);
      return `rgba(153, ${Math.round(102 - intensity * 50)}, 255, 0.7)`;
    });
    
    return {
      labels: provinceData.map(item => item.province),
      datasets: [
        {
          label: 'Émissions de CO2 moyennes (Mt)',
          data: provinceData.map(item => item.value),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1
        }
      ]
    };
  };
  
  // Prepare data for precipitation monthly chart
  const getPrecipitationMonthlyChartData = () => {
    if (!analysisData.precipitation) return { labels: months, datasets: [] };
    
    const monthlyData = analysisData.precipitation.monthlyAverages || [];
    
    return {
      labels: monthlyData.map(item => item.month),
      datasets: [
        {
          label: 'Précipitations moyennes (mm)',
          data: monthlyData.map(item => item.value),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    };
  };
  
  const AnalysisCard = ({ title, children, className = '' }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
  
  const StatCard = ({ title, value, unit, subtitle, color = 'blue' }) => (
    <div className={`bg-${color}-50 border border-${color}-200 p-4 rounded-lg`}>
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      <div className={`text-3xl font-bold text-${color}-600 my-2`}>
        {value} {unit}
      </div>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Analyse climatique</h1>
          <p className="text-gray-600">
            Résultats des analyses des données climatiques canadiennes (2021-2023)
          </p>
        </div>
        
        {/* Temperature analysis section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Analyse des températures</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Mois le plus chaud" 
              value={analysisData.temperature?.warmestMonth?.temperature || '—'}
              unit="°C"
              subtitle={`${analysisData.temperature?.warmestMonth?.month || '—'} ${analysisData.temperature?.warmestMonth?.year || ''}`}
              color="red"
            />
            <StatCard 
              title="Mois le plus froid" 
              value={analysisData.temperature?.coldestMonth?.temperature || '—'}
              unit="°C"
              subtitle={`${analysisData.temperature?.coldestMonth?.month || '—'} ${analysisData.temperature?.coldestMonth?.year || ''}`}
              color="blue"
            />
            <StatCard 
              title="Province la plus chaude" 
              value={analysisData.temperature?.warmestProvince?.temperature || '—'}
              unit="°C"
              subtitle={analysisData.temperature?.warmestProvince?.province || '—'}
              color="orange"
            />
            <StatCard 
              title="Province la plus froide" 
              value={analysisData.temperature?.coldestProvince?.temperature || '—'}
              unit="°C"
              subtitle={analysisData.temperature?.coldestProvince?.province || '—'}
              color="indigo"
            />
          </div>
          
          <AnalysisCard title="Températures moyennes mensuelles (2021-2023)">
            <LineChart 
              datasets={getTemperatureMonthlyChartData().datasets}
              labels={getTemperatureMonthlyChartData().labels}
              yAxisLabel="°C"
              height={300}
            />
          </AnalysisCard>
        </section>
        
        {/* Pollution analysis section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-800">Analyse des émissions de CO2</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Mois le plus pollué" 
              value={analysisData.pollution?.mostPollutedMonth?.pollution || '—'}
              unit="Mt"
              subtitle={`${analysisData.pollution?.mostPollutedMonth?.month || '—'} ${analysisData.pollution?.mostPollutedMonth?.year || ''}`}
              color="purple"
            />
            <StatCard 
              title="Mois le moins pollué" 
              value={analysisData.pollution?.leastPollutedMonth?.pollution || '—'}
              unit="Mt"
              subtitle={`${analysisData.pollution?.leastPollutedMonth?.month || '—'} ${analysisData.pollution?.leastPollutedMonth?.year || ''}`}
              color="green"
            />
            <StatCard 
              title="Province la plus polluée" 
              value={analysisData.pollution?.mostPollutedProvince?.pollution || '—'}
              unit="Mt"
              subtitle={analysisData.pollution?.mostPollutedProvince?.province || '—'}
              color="red"
            />
            <StatCard 
              title="Province la moins polluée" 
              value={analysisData.pollution?.leastPollutedProvince?.pollution || '—'}
              unit="Mt"
              subtitle={analysisData.pollution?.leastPollutedProvince?.province || '—'}
              color="green"
            />
          </div>
          
          <AnalysisCard title="Émissions de CO2 moyennes par province (2021-2023)">
            <BarChart 
              datasets={getPollutionProvinceChartData().datasets}
              labels={getPollutionProvinceChartData().labels}
              yAxisLabel="Mt"
              height={400}
              horizontal={true}
            />
          </AnalysisCard>
        </section>
        
        {/* Precipitation analysis section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Analyse des précipitations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Mois le plus pluvieux" 
              value={analysisData.precipitation?.rainiestMonth?.precipitation || '—'}
              unit="mm"
              subtitle={`${analysisData.precipitation?.rainiestMonth?.month || '—'} ${analysisData.precipitation?.rainiestMonth?.year || ''}`}
              color="blue"
            />
            <StatCard 
              title="Mois le plus sec" 
              value={analysisData.precipitation?.driestMonth?.precipitation || '—'}
              unit="mm"
              subtitle={`${analysisData.precipitation?.driestMonth?.month || '—'} ${analysisData.precipitation?.driestMonth?.year || ''}`}
              color="yellow"
            />
            <StatCard 
              title="Province la plus pluvieuse" 
              value={analysisData.precipitation?.rainiestProvince?.precipitation || '—'}
              unit="mm"
              subtitle={analysisData.precipitation?.rainiestProvince?.province || '—'}
              color="blue"
            />
            <StatCard 
              title="Province la plus sèche" 
              value={analysisData.precipitation?.driestProvince?.precipitation || '—'}
              unit="mm"
              subtitle={analysisData.precipitation?.driestProvince?.province || '—'}
              color="yellow"
            />
          </div>
          
          <AnalysisCard title="Précipitations moyennes mensuelles (2021-2023)">
            <LineChart 
              datasets={getPrecipitationMonthlyChartData().datasets}
              labels={getPrecipitationMonthlyChartData().labels}
              yAxisLabel="mm"
              height={300}
            />
          </AnalysisCard>
        </section>
        
        {/* Methodology section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Méthodologie d'analyse</h2>
          <p className="mb-4">
            Les analyses présentées sur cette page sont basées sur les données climatiques collectées pour toutes les 
            provinces et territoires du Canada sur la période 2021-2023. Les résultats sont calculés à l'aide de 
            procédures stockées dans notre base de données qui effectuent les calculs suivants:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Mois le plus chaud/froid:</strong> Moyenne des températures de chaque mois à travers toutes les provinces 
              et les trois années d'étude, puis identification des valeurs maximales et minimales.
            </li>
            <li>
              <strong>Province la plus chaude/froide:</strong> Moyenne des températures annuelles pour chaque province sur 
              les trois années d'étude, puis identification des valeurs maximales et minimales.
            </li>
            <li>
              <strong>Mois le plus/moins pollué:</strong> Moyenne des émissions de CO2 de chaque mois à travers toutes les provinces 
              et les trois années d'étude, puis identification des valeurs maximales et minimales.
            </li>
            <li>
              <strong>Province la plus/moins polluée:</strong> Moyenne des émissions annuelles pour chaque province sur 
              les trois années d'étude, puis identification des valeurs maximales et minimales.
            </li>
            <li>
              <strong>Mois le plus pluvieux/sec:</strong> Moyenne des précipitations de chaque mois à travers toutes les provinces 
              et les trois années d'étude, puis identification des valeurs maximales et minimales.
            </li>
            <li>
              <strong>Province la plus pluvieuse/sèche:</strong> Moyenne des précipitations annuelles pour chaque province sur 
              les trois années d'étude, puis identification des valeurs maximales et minimales.
            </li>
          </ul>
          <p>
            Toutes les analyses sont effectuées sur les données brutes collectées auprès d'Environnement Canada et 
            Statistiques Canada, avec des procédures de contrôle de qualité pour garantir la précision des résultats.
          </p>
        </section>
      </div>
    </Layout>
  );
}
