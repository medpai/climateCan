// Script pour initialiser la base de données
const { initializeDatabase } = require('./models/schemas/index.js');

async function run() {
  console.log('Initialisation de la base de données...');
  
  try {
    const result = await initializeDatabase();
    
    if (result) {
      console.log('SUCCÈS: Base de données initialisée avec succès!');
    } else {
      console.log('ÉCHEC: L\'initialisation de la base de données a échoué.');
    }
  } catch (error) {
    console.error('ERREUR lors de l\'initialisation:', error);
  }
}

// Exécuter l'initialisation
run();
