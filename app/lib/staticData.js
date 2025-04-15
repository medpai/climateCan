'use client';

// Données statiques qui seront utilisées lorsque l'application est déployée sur GitHub Pages
export const temperatureData = {
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

export const pollutionData = {
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

export const precipitationData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  datasets: [
    {
      label: 'Ontario (2023)',
      data: [68, 54, 74, 88, 92, 74, 78, 68, 82, 98, 72, 76],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Québec (2023)',
      data: [86, 72, 78, 102, 96, 82, 74, 68, 88, 112, 96, 92],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Colombie-Britannique (2023)',
      data: [154, 126, 118, 88, 72, 58, 42, 48, 76, 142, 168, 178],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.3,
      fill: true
    }
  ]
};

// Fonction pour détecter si on est en mode statique (GitHub Pages)
export const isStaticMode = () => {
  return (
    typeof window !== 'undefined' && 
    (window.location.hostname.includes('github.io') || 
     process.env.NEXT_PUBLIC_STATIC_MODE === 'true')
  );
};
