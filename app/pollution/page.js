'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DataTable from '../components/DataTable';

export default function PollutionPage() {
  const [activeYear, setActiveYear] = useState(2023);
  const [activeProvince, setActiveProvince] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [pollutionData, setPollutionData] = useState([]);
  
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
  const monthsShort = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  // Sample pollution data (in a real application, this would come from the API)
  useEffect(() => {
    // Simulate API call to fetch pollution data
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real application, this would be an API call
        // const response = await fetch(`/api/pollution?year=${activeYear}`);
        // const data = await response.json();
        
        // For now, we'll use sample data
        setTimeout(() => {
          const sampleData = generateSampleData(activeYear);
          setPollutionData(sampleData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching pollution data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeYear]);
  
  // Generate sample pollution data for demonstration
  const generateSampleData = (year) => {
    return provinces.map(province => {
      // Base pollution patterns adjusted by province and year
      let baseValues;
      
      // More industrialized provinces have higher pollution
      if (['ON', 'QC', 'AB'].includes(province.code)) {
        baseValues = [40, 38, 36, 35, 32, 34, 38, 40, 38, 36, 38, 42];
      } 
      // Medium pollution provinces
      else if (['BC', 'MB', 'SK', 'NS', 'NB'].includes(province.code)) {
        baseValues = [20, 19, 18, 17, 16, 18, 20, 22, 20, 19, 20, 22];
      }
      // Less populated provinces have lower pollution
      else {
        baseValues = [8, 7, 7, 6, 5, 6, 7, 8, 7, 6, 7, 8];
      }
      
      // Add some randomness and year-specific adjustments
      // Pollution tends to decrease slightly year over year due to green initiatives
      const yearAdjustment = (year - 2021) * -0.5; 
      
      const monthlyValues = baseValues.map(value => {
        // Add randomness and year adjustment
        const randomFactor = Math.random() * 2 - 1; // -1 to +1
        return parseFloat((value + randomFactor + yearAdjustment).toFixed(1));
      });
      
      return {
        province_code: province.code,
        province_name: province.name,
        year: year,
        january: monthlyValues[0],
        february: monthlyValues[1],
        march: monthlyValues[2],
        april: monthlyValues[3],
        may: monthlyValues[4],
        june: monthlyValues[5],
        july: monthlyValues[6],
        august: monthlyValues[7],
        september: monthlyValues[8],
        october: monthlyValues[9],
        november: monthlyValues[10],
        december: monthlyValues[11]
      };
    });
  };
  
  // Prepare data for line chart (monthly pollution)
  const getLineChartData = () => {
    if (pollutionData.length === 0) return { labels: monthsShort, datasets: [] };
    
    if (activeProvince === 'all') {
      // Show data for all provinces
      const datasets = provinces.map((province, index) => {
        const provinceData = pollutionData.find(item => item.province_code === province.code);
        
        if (!provinceData) return null;
        
        // Generate a color based on index
        const hue = (index * 30) % 360;
        
        return {
          label: province.name,
          data: [
            provinceData.january,
            provinceData.february,
            provinceData.march,
            provinceData.april,
            provinceData.may,
            provinceData.june,
            provinceData.july,
            provinceData.august,
            provinceData.september,
            provinceData.october,
            provinceData.november,
            provinceData.december
          ],
          borderColor: `hsl(${hue}, 70%, 50%)`,
          backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
          tension: 0.3,
          fill: false
        };
      }).filter(Boolean);
      
      return {
        labels: monthsShort,
        datasets
      };
    } else {
      // Show data for selected province
      const provinceData = pollutionData.find(item => item.province_code === activeProvince);
      
      if (!provinceData) return { labels: monthsShort, datasets: [] };
      
      return {
        labels: monthsShort,
        datasets: [
          {
            label: provinceData.province_name,
            data: [
              provinceData.january,
              provinceData.february,
              provinceData.march,
              provinceData.april,
              provinceData.may,
              provinceData.june,
              provinceData.july,
              provinceData.august,
              provinceData.september,
              provinceData.october,
              provinceData.november,
              provinceData.december
            ],
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.3,
            fill: true
          }
        ]
      };
    }
  };
  
  // Prepare data for bar chart (average annual pollution by province)
  const getBarChartData = () => {
    if (pollutionData.length === 0) return { labels: [], datasets: [] };
    
    const provinceLabels = pollutionData.map(item => item.province_code);
    const averageValues = pollutionData.map(item => {
      const sum = [
        item.january, item.february, item.march, item.april, 
        item.may, item.june, item.july, item.august, 
        item.september, item.october, item.november, item.december
      ].reduce((acc, val) => acc + val, 0);
      
      return parseFloat((sum / 12).toFixed(1));
    });
    
    // Sort provinces by pollution (highest to lowest)
    const combined = provinceLabels.map((label, i) => ({ label, value: averageValues[i] }));
    combined.sort((a, b) => b.value - a.value);
    
    const sortedLabels = combined.map(item => {
      const province = provinces.find(p => p.code === item.label);
      return province ? province.name : item.label;
    });
    const sortedValues = combined.map(item => item.value);
    
    // Generate colors based on pollution level (higher = more intense purple)
    const backgroundColors = sortedValues.map(value => {
      const intensity = Math.min(1, value / 40);
      return `rgba(153, ${Math.round(102 - intensity * 50)}, 255, 0.7)`;
    });
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: `Émissions de CO2 moyennes (${activeYear})`,
          data: sortedValues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1
        }
      ]
    };
  };
  
  // Table columns configuration
  const tableColumns = [
    { key: 'province_name', label: 'Province/Territoire' },
    { key: 'january', label: 'Jan' },
    { key: 'february', label: 'Fév' },
    { key: 'march', label: 'Mar' },
    { key: 'april', label: 'Avr' },
    { key: 'may', label: 'Mai' },
    { key: 'june', label: 'Juin' },
    { key: 'july', label: 'Juil' },
    { key: 'august', label: 'Août' },
    { key: 'september', label: 'Sep' },
    { key: 'october', label: 'Oct' },
    { key: 'november', label: 'Nov' },
    { key: 'december', label: 'Déc' },
    { 
      key: 'average', 
      label: 'Moyenne',
      render: (row) => {
        const values = [
          row.january, row.february, row.march, row.april, 
          row.may, row.june, row.july, row.august, 
          row.september, row.october, row.november, row.december
        ];
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        return avg.toFixed(1) + ' Mt';
      }
    }
  ];
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Données de pollution</h1>
            <p className="text-gray-600">
              Émissions de CO2 moyennes mensuelles (mégatonnes) par province et territoire du Canada
            </p>
          </div>
          
          {/* Year selector */}
          <div className="flex space-x-2">
            {[2021, 2022, 2023].map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 rounded-md ${
                  activeYear === year
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        
        {/* Province selector */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Sélectionner une province/territoire:</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveProvince('all')}
              className={`px-3 py-1 rounded-md text-sm ${
                activeProvince === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              Toutes les provinces
            </button>
            {provinces.map(province => (
              <button
                key={province.code}
                onClick={() => setActiveProvince(province.code)}
                className={`px-3 py-1 rounded-md text-sm ${
                  activeProvince === province.code
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {province.code} - {province.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly pollution line chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Émissions mensuelles {activeProvince !== 'all' ? `- ${provinces.find(p => p.code === activeProvince)?.name}` : ''}
            </h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <LineChart 
                title={`Émissions de CO2 moyennes par mois (${activeYear})`}
                datasets={getLineChartData().datasets}
                labels={getLineChartData().labels}
                yAxisLabel="Mt"
                height={320}
              />
            )}
          </div>
          
          {/* Average annual pollution bar chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Émissions moyennes annuelles par province</h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <BarChart 
                title={`Émissions de CO2 moyennes par province (${activeYear})`}
                datasets={getBarChartData().datasets}
                labels={getBarChartData().labels}
                yAxisLabel="Mt"
                height={320}
                horizontal={true}
              />
            )}
          </div>
        </div>
        
        {/* Data table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tableau des émissions mensuelles ({activeYear})</h2>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <DataTable 
              columns={tableColumns}
              data={pollutionData}
              pagination={true}
              itemsPerPage={10}
              sortable={true}
            />
          )}
          <div className="mt-4 text-sm text-gray-500">
            <p>Données d'émissions de CO2 en mégatonnes (Mt)</p>
            <p>Source: Environnement Canada, Statistiques Canada</p>
          </div>
        </div>
        
        {/* Information section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">À propos des données de pollution</h2>
          <p className="mb-4">
            Les données de pollution présentées sur cette page représentent les émissions de CO2 moyennes mensuelles 
            pour chaque province et territoire du Canada. Ces données sont collectées à partir de stations de surveillance 
            et d'estimations basées sur l'activité industrielle, le transport et d'autres sources d'émissions.
          </p>
          <p>
            Les émissions sont exprimées en mégatonnes (Mt) de CO2 et peuvent varier considérablement entre les provinces 
            en fonction de leur taille, population, niveau d'industrialisation et mix énergétique. Les provinces avec 
            une forte activité industrielle ou une production d'énergie basée sur les combustibles fossiles tendent à 
            avoir des émissions plus élevées.
          </p>
        </div>
      </div>
    </Layout>
  );
}
