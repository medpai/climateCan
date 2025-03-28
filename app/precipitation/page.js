'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DataTable from '../components/DataTable';

export default function PrecipitationPage() {
  const [activeYear, setActiveYear] = useState(2023);
  const [activeProvince, setActiveProvince] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [precipitationData, setPrecipitationData] = useState([]);
  
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
  
  // Sample precipitation data (in a real application, this would come from the API)
  useEffect(() => {
    // Simulate API call to fetch precipitation data
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // In a real application, this would be an API call
        // const response = await fetch(`/api/precipitation?year=${activeYear}`);
        // const data = await response.json();
        
        // For now, we'll use sample data
        setTimeout(() => {
          const sampleData = generateSampleData(activeYear);
          setPrecipitationData(sampleData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching precipitation data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeYear]);
  
  // Generate sample precipitation data for demonstration
  const generateSampleData = (year) => {
    return provinces.map(province => {
      // Base precipitation patterns adjusted by province and year
      let baseValues;
      
      // BC coast has higher precipitation
      if (province.code === 'BC') {
        baseValues = [180, 160, 140, 100, 80, 60, 40, 50, 70, 120, 160, 190];
      } 
      // Atlantic provinces have higher precipitation
      else if (['NL', 'NS', 'NB', 'PE'].includes(province.code)) {
        baseValues = [140, 130, 120, 110, 100, 90, 80, 90, 100, 120, 130, 140];
      }
      // Prairie provinces are drier
      else if (['SK', 'AB', 'MB'].includes(province.code)) {
        baseValues = [30, 25, 30, 40, 60, 80, 70, 60, 50, 40, 30, 25];
      }
      // Northern territories have lower precipitation
      else if (['YT', 'NT', 'NU'].includes(province.code)) {
        baseValues = [20, 15, 20, 25, 30, 40, 50, 45, 35, 25, 20, 15];
      }
      // Central provinces (ON, QC)
      else {
        baseValues = [80, 70, 75, 85, 90, 95, 100, 90, 85, 80, 85, 80];
      }
      
      // Add some randomness and year-specific adjustments
      // Precipitation tends to increase slightly year over year due to climate change
      const yearAdjustment = (year - 2021) * 2; 
      
      const monthlyValues = baseValues.map(value => {
        // Add randomness and year adjustment
        const randomFactor = Math.random() * 10 - 5; // -5 to +5
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
  
  // Prepare data for line chart (monthly precipitation)
  const getLineChartData = () => {
    if (precipitationData.length === 0) return { labels: monthsShort, datasets: [] };
    
    if (activeProvince === 'all') {
      // Show data for all provinces
      const datasets = provinces.map((province, index) => {
        const provinceData = precipitationData.find(item => item.province_code === province.code);
        
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
      const provinceData = precipitationData.find(item => item.province_code === activeProvince);
      
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
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.3,
            fill: true
          }
        ]
      };
    }
  };
  
  // Prepare data for bar chart (average annual precipitation by province)
  const getBarChartData = () => {
    if (precipitationData.length === 0) return { labels: [], datasets: [] };
    
    const provinceLabels = precipitationData.map(item => item.province_code);
    const averageValues = precipitationData.map(item => {
      const sum = [
        item.january, item.february, item.march, item.april, 
        item.may, item.june, item.july, item.august, 
        item.september, item.october, item.november, item.december
      ].reduce((acc, val) => acc + val, 0);
      
      return parseFloat((sum / 12).toFixed(1));
    });
    
    // Sort provinces by precipitation (highest to lowest)
    const combined = provinceLabels.map((label, i) => ({ label, value: averageValues[i] }));
    combined.sort((a, b) => b.value - a.value);
    
    const sortedLabels = combined.map(item => {
      const province = provinces.find(p => p.code === item.label);
      return province ? province.name : item.label;
    });
    const sortedValues = combined.map(item => item.value);
    
    // Generate colors based on precipitation level (higher = more intense blue)
    const backgroundColors = sortedValues.map(value => {
      const intensity = Math.min(1, value / 150);
      return `rgba(${Math.round(54 - intensity * 30)}, ${Math.round(162 - intensity * 50)}, 235, 0.7)`;
    });
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: `Précipitations moyennes (${activeYear})`,
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
        return avg.toFixed(1) + ' mm';
      }
    }
  ];
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Données de précipitations</h1>
            <p className="text-gray-600">
              Précipitations moyennes mensuelles (mm) par province et territoire du Canada
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
          {/* Monthly precipitation line chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Précipitations mensuelles {activeProvince !== 'all' ? `- ${provinces.find(p => p.code === activeProvince)?.name}` : ''}
            </h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <LineChart 
                title={`Précipitations moyennes par mois (${activeYear})`}
                datasets={getLineChartData().datasets}
                labels={getLineChartData().labels}
                yAxisLabel="mm"
                height={320}
              />
            )}
          </div>
          
          {/* Average annual precipitation bar chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Précipitations moyennes annuelles par province</h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <BarChart 
                title={`Précipitations moyennes par province (${activeYear})`}
                datasets={getBarChartData().datasets}
                labels={getBarChartData().labels}
                yAxisLabel="mm"
                height={320}
                horizontal={true}
              />
            )}
          </div>
        </div>
        
        {/* Data table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tableau des précipitations mensuelles ({activeYear})</h2>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <DataTable 
              columns={tableColumns}
              data={precipitationData}
              pagination={true}
              itemsPerPage={10}
              sortable={true}
            />
          )}
          <div className="mt-4 text-sm text-gray-500">
            <p>Données de précipitations en millimètres (mm)</p>
            <p>Source: Environnement Canada, Statistiques Canada</p>
          </div>
        </div>
        
        {/* Information section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">À propos des données de précipitations</h2>
          <p className="mb-4">
            Les données de précipitations présentées sur cette page représentent les précipitations moyennes mensuelles 
            pour chaque province et territoire du Canada. Ces données incluent toutes les formes de précipitations 
            (pluie, neige, grêle) converties en équivalent eau (millimètres).
          </p>
          <p>
            Les précipitations sont exprimées en millimètres (mm) et peuvent varier considérablement entre les provinces 
            en fonction de leur géographie, proximité des océans, et autres facteurs climatiques. Les régions côtières 
            comme la Colombie-Britannique et les provinces atlantiques reçoivent généralement plus de précipitations 
            que les prairies ou les territoires nordiques.
          </p>
        </div>
      </div>
    </Layout>
  );
}
