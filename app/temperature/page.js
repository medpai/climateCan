'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DataTable from '../components/DataTable';
import Image from 'next/image';

export default function TemperaturePage() {
  const [activeYear, setActiveYear] = useState(2023);
  const [activeProvince, setActiveProvince] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [temperatureData, setTemperatureData] = useState([]);
  
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
  
  // Sample temperature data (in a real application, this would come from the API)
  useEffect(() => {
    // Simulate API call to fetch temperature data
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real application, this would be an API call
        // const response = await fetch(`/api/temperature?year=${activeYear}`);
        // const data = await response.json();
        
        // For now, we'll use sample data
        setTimeout(() => {
          const sampleData = generateSampleData(activeYear);
          setTemperatureData(sampleData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeYear]);
  
  // Generate sample temperature data for demonstration
  const generateSampleData = (year) => {
    return provinces.map(province => {
      // Base temperature patterns adjusted by province and year
      let baseTemps;
      
      // Northern territories are colder
      if (['YT', 'NT', 'NU'].includes(province.code)) {
        baseTemps = [-30, -25, -20, -10, 0, 10, 15, 12, 5, -5, -15, -25];
      } 
      // Atlantic provinces have more moderate temperatures
      else if (['NL', 'PE', 'NS', 'NB'].includes(province.code)) {
        baseTemps = [-8, -6, -2, 4, 10, 16, 20, 19, 15, 10, 4, -4];
      }
      // Prairie provinces have more extreme temperatures
      else if (['MB', 'SK', 'AB'].includes(province.code)) {
        baseTemps = [-20, -15, -5, 5, 12, 18, 22, 20, 15, 8, -5, -15];
      }
      // BC has milder temperatures due to Pacific influence
      else if (province.code === 'BC') {
        baseTemps = [2, 4, 6, 10, 14, 18, 22, 21, 18, 12, 6, 3];
      }
      // Central provinces (ON, QC)
      else {
        baseTemps = [-12, -10, -5, 5, 12, 18, 22, 20, 15, 8, 0, -8];
      }
      
      // Add some randomness and year-specific adjustments
      const yearAdjustment = (year - 2021) * 0.2; // Slight warming trend
      
      const monthlyTemps = baseTemps.map(temp => {
        // Add randomness and year adjustment
        const randomFactor = Math.random() * 2 - 1; // -1 to +1
        return parseFloat((temp + randomFactor + yearAdjustment).toFixed(1));
      });
      
      return {
        province_code: province.code,
        province_name: province.name,
        year: year,
        january: monthlyTemps[0],
        february: monthlyTemps[1],
        march: monthlyTemps[2],
        april: monthlyTemps[3],
        may: monthlyTemps[4],
        june: monthlyTemps[5],
        july: monthlyTemps[6],
        august: monthlyTemps[7],
        september: monthlyTemps[8],
        october: monthlyTemps[9],
        november: monthlyTemps[10],
        december: monthlyTemps[11]
      };
    });
  };
  
  // Prepare data for line chart (monthly temperatures)
  const getLineChartData = () => {
    if (temperatureData.length === 0) return { labels: monthsShort, datasets: [] };
    
    if (activeProvince === 'all') {
      // Show data for all provinces
      const datasets = provinces.map((province, index) => {
        const provinceData = temperatureData.find(item => item.province_code === province.code);
        
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
      const provinceData = temperatureData.find(item => item.province_code === activeProvince);
      
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
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3,
            fill: true
          }
        ]
      };
    }
  };
  
  // Prepare data for bar chart (average annual temperature by province)
  const getBarChartData = () => {
    if (temperatureData.length === 0) return { labels: [], datasets: [] };
    
    const provinceLabels = temperatureData.map(item => item.province_code);
    const averageTemps = temperatureData.map(item => {
      const sum = [
        item.january, item.february, item.march, item.april, 
        item.may, item.june, item.july, item.august, 
        item.september, item.october, item.november, item.december
      ].reduce((acc, val) => acc + val, 0);
      
      return parseFloat((sum / 12).toFixed(1));
    });
    
    // Sort provinces by temperature (warmest to coldest)
    const combined = provinceLabels.map((label, i) => ({ label, value: averageTemps[i] }));
    combined.sort((a, b) => b.value - a.value);
    
    const sortedLabels = combined.map(item => {
      const province = provinces.find(p => p.code === item.label);
      return province ? province.name : item.label;
    });
    const sortedValues = combined.map(item => item.value);
    
    // Generate colors based on temperature (warmer = more red, colder = more blue)
    const backgroundColors = sortedValues.map(temp => {
      if (temp > 10) {
        // Warm (red)
        const intensity = Math.min(1, (temp - 10) / 15);
        return `rgba(255, ${Math.round(150 - intensity * 150)}, 0, 0.7)`;
      } else if (temp > 0) {
        // Mild (yellow to orange)
        const intensity = temp / 10;
        return `rgba(255, ${Math.round(200 - intensity * 50)}, 0, 0.7)`;
      } else {
        // Cold (blue)
        const intensity = Math.min(1, Math.abs(temp) / 20);
        return `rgba(0, ${Math.round(150 - intensity * 50)}, ${Math.round(200 + intensity * 55)}, 0.7)`;
      }
    });
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: `Température moyenne annuelle (${activeYear})`,
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
        return avg.toFixed(1) + ' °C';
      }
    }
  ];
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Données de température</h1>
            <p className="text-gray-600">
              Températures moyennes mensuelles (°C) par province et territoire du Canada
            </p>
          </div>
          
          {/* Year selector */}
          <div className="flex space-x-2">
            {[2021, 2022, 2023, 2024].map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 rounded-md ${
                  activeYear === year
                    ? 'bg-blue-600 text-white'
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
                  ? 'bg-blue-600 text-white'
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
                    ? 'bg-blue-600 text-white'
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
          {/* Monthly temperature line chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Températures mensuelles {activeProvince !== 'all' ? `- ${provinces.find(p => p.code === activeProvince)?.name}` : ''}
            </h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <LineChart 
                title={`Températures moyennes par mois (${activeYear})`}
                datasets={getLineChartData().datasets}
                labels={getLineChartData().labels}
                yAxisLabel="°C"
                height={320}
              />
            )}
          </div>
          
          {/* Average annual temperature bar chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Températures moyennes annuelles par province</h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <BarChart 
                title={`Température moyenne annuelle par province (${activeYear})`}
                datasets={getBarChartData().datasets}
                labels={getBarChartData().labels}
                yAxisLabel="°C"
                height={320}
                horizontal={true}
              />
            )}
          </div>
        </div>
        
        {/* Data table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tableau des températures mensuelles ({activeYear})</h2>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <DataTable 
              columns={tableColumns}
              data={temperatureData}
              pagination={true}
              itemsPerPage={10}
              sortable={true}
            />
          )}
          <div className="mt-4 text-sm text-gray-500">
            <p>Données de température en degrés Celsius (°C)</p>
            <p>Source: Environnement Canada, Statistiques Canada</p>
          </div>
        </div>
        
        {/* Information section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">À propos des données de température</h2>
          <p className="mb-4">
            Les données de température présentées sur cette page représentent les températures moyennes mensuelles 
            pour chaque province et territoire du Canada. Ces données sont collectées à partir de stations météorologiques 
            réparties à travers le pays et sont fournies par Environnement Canada.
          </p>
          <p>
            Les températures sont exprimées en degrés Celsius (°C) et sont calculées comme la moyenne des températures 
            quotidiennes pour chaque mois. Les variations peuvent être importantes entre les différentes régions d'une 
            même province, particulièrement pour les provinces de grande superficie.
          </p>
        </div>
      </div>
    </Layout>
  );
}
