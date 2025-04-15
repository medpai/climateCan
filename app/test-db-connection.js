// Script pour tester la connexion à la base de données
const { testConnection } = require('./models/database.js');

async function runTest() {
  console.log('Tentative de connexion à SQL Server...');
  
  try {
    const result = await testConnection();
    
    if (result) {
      console.log('SUCCÈS: La base de données est correctement connectée!');
    } else {
      console.log('ÉCHEC: La connexion à la base de données a échoué.');
    }
  } catch (error) {
    console.error('ERREUR lors du test de connexion:', error);
  }
}

// Exécuter le test
runTest();
