'use client';

import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import LineChart from './components/charts/LineChart';
import BarChart from './components/charts/BarChart';
import Link from 'next/link';
import Image from 'next/image';
import apiClient from './lib/apiClient';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [temperatureData, setTemperatureData] = useState(null);
  const [pollutionData, setPollutionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Vérifier la connexion à la base de données
        const connectionStatus = await apiClient.testDatabaseConnection();
        console.log('État de connexion à la base de données:', connectionStatus);
        
        // Si c'est la première fois, initialiser la base de données avec des données
        try {
          const seedResult = await apiClient.seedDatabase();
          console.log('Résultat de l\'initialisation de la base de données:', seedResult);
        } catch (seedError) {
          console.warn('Note: La base de données pourrait déjà être initialisée', seedError);
        }
        
        // Récupérer les données de température pour l'Ontario, Québec et Colombie-Britannique
        const tempResult = await apiClient.getTemperatures({ year: '2023' });
        
        if (tempResult.success && tempResult.data) {
          // Filtrer les données pour les provinces spécifiques
          const ontarioData = tempResult.data.find(p => p.province_code === 'ON');
          const quebecData = tempResult.data.find(p => p.province_code === 'QC');
          const bcData = tempResult.data.find(p => p.province_code === 'BC');
          
          // Transformer les données pour le format du graphique
          const formattedTempData = {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: []
          };
          
          if (ontarioData) {
            formattedTempData.datasets.push({
              label: 'Ontario (2023)',
              data: [
                ontarioData.january, ontarioData.february, ontarioData.march, 
                ontarioData.april, ontarioData.may, ontarioData.june,
                ontarioData.july, ontarioData.august, ontarioData.september,
                ontarioData.october, ontarioData.november, ontarioData.december
              ],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.3,
              fill: true
            });
          }
          
          if (quebecData) {
            formattedTempData.datasets.push({
              label: 'Québec (2023)',
              data: [
                quebecData.january, quebecData.february, quebecData.march, 
                quebecData.april, quebecData.may, quebecData.june,
                quebecData.july, quebecData.august, quebecData.september,
                quebecData.october, quebecData.november, quebecData.december
              ],
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.3,
              fill: true
            });
          }
          
          if (bcData) {
            formattedTempData.datasets.push({
              label: 'Colombie-Britannique (2023)',
              data: [
                bcData.january, bcData.february, bcData.march, 
                bcData.april, bcData.may, bcData.june,
                bcData.july, bcData.august, bcData.september,
                bcData.october, bcData.november, bcData.december
              ],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.3,
              fill: true
            });
          }
          
          setTemperatureData(formattedTempData);
        }
        
        // Récupérer les données de pollution pour toutes les provinces
        const pollResult = await apiClient.getPollution({ year: '2023' });
        
        if (pollResult.success && pollResult.data) {
          // Transformer les données pour le format du graphique
          const formattedPollData = {
            labels: pollResult.data.map(p => p.province_code),
            datasets: [{
              label: 'Émissions de CO2 moyennes (Mt) - 2023',
              // Calculer la moyenne de pollution par province (moyenne des mois)
              data: pollResult.data.map(p => {
                const monthlyValues = [
                  p.january, p.february, p.march, p.april, p.may, p.june,
                  p.july, p.august, p.september, p.october, p.november, p.december
                ];
                const sum = monthlyValues.reduce((acc, val) => acc + val, 0);
                return (sum / 12).toFixed(1);
              }),
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1
            }]
          };
          
          setPollutionData(formattedPollData);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Utiliser des données de secours si l'API échoue
  const fallbackTemperatureData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Ontario (2023)',
        data: [-5.2, -3.8, 2.1, 8.4, 14.7, 19.2, 22.5, 21.3, 16.8, 10.2, 3.6, -2.5],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Québec (2023)',
        data: [-12.5, -10.2, -3.6, 3.8, 11.2, 16.5, 19.8, 18.6, 13.2, 6.5, -0.8, -8.4],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Colombie-Britannique (2023)',
        data: [2.8, 4.2, 6.5, 9.8, 13.2, 16.5, 19.2, 19.5, 16.2, 11.5, 6.2, 3.5],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const fallbackPollutionData = {
    labels: ['ON', 'QC', 'AB', 'BC', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU'],
    datasets: [
      {
        label: 'Émissions de CO2 moyennes (Mt) - 2023',
        data: [42.5, 28.3, 38.7, 22.4, 12.8, 15.6, 8.2, 7.5, 6.3, 2.1, 1.8, 1.5, 1.2],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg p-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Canada Weather: Analyse des données climatiques</h1>
            <p className="text-xl mb-6">
              Explorez les tendances de température, pollution et précipitations à travers les provinces et territoires du Canada.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/temperature" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
                Explorer les données
              </Link>
              <Link href="/analysis" className="bg-transparent hover:bg-white/20 border border-white px-6 py-3 rounded-lg font-medium transition-colors">
                Voir les analyses
              </Link>
            </div>
          </div>
        </section>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erreur! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Temperature chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Températures moyennes</h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <LineChart 
                title="Températures moyennes par mois (2023)" 
                datasets={temperatureData?.datasets || fallbackTemperatureData.datasets}
                labels={temperatureData?.labels || fallbackTemperatureData.labels}
                yAxisLabel="°C"
                height={320}
              />
            )}
            <div className="mt-4">
              <Link href="/temperature" className="text-blue-600 hover:underline font-medium">
                Voir toutes les données de température →
              </Link>
            </div>
          </div>

          {/* Pollution chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Émissions de CO2</h2>
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <BarChart 
                title="Émissions de CO2 par province (2023)" 
                datasets={pollutionData?.datasets || fallbackPollutionData.datasets}
                labels={pollutionData?.labels || fallbackPollutionData.labels}
                yAxisLabel="Mt"
                height={320}
              />
            )}
            <div className="mt-4">
              <Link href="/pollution" className="text-blue-600 hover:underline font-medium">
                Voir toutes les données de pollution →
              </Link>
            </div>
          </div>
        </div>

        {/* Features section */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Caractéristiques principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visualisation des données</h3>
              <p className="text-gray-600">
                Graphiques interactifs pour visualiser les tendances climatiques à travers les provinces et territoires canadiens.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyse comparative</h3>
              <p className="text-gray-600">
                Comparaison des données climatiques entre différentes provinces et sur plusieurs années pour identifier les tendances.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Données historiques</h3>
              <p className="text-gray-600">
                Accès aux données climatiques des trois dernières années (2021-2023) pour toutes les provinces et territoires.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à explorer les données climatiques?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Découvrez les tendances de température, pollution et précipitations à travers le Canada.
          </p>
          <Link href="/temperature" className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
            Commencer l'exploration
          </Link>
        </section>
      </div>
    </Layout>
  );
}
