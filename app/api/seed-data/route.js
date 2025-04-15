import { NextResponse } from 'next/server';
import dataService from '../../services/dataService';
import { sequelize } from '../../models/database.js';

// API endpoint pour initialiser la base de données et insérer des données initiales
export async function GET() {
  try {
    // Synchroniser les modèles avec la base de données (créer les tables si nécessaire)
    await sequelize.sync({ alter: true });
    console.log('Modèles synchronisés avec la base de données');
    
    // Insérer les données initiales
    const result = await dataService.seedAllData();
    
    if (result) {
      return NextResponse.json({ 
        success: true, 
        message: 'Base de données initialisée et données insérées avec succès' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Problème lors de l\'insertion des données' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur lors de l\'initialisation de la base de données: ' + error.message 
    }, { status: 500 });
  }
}
