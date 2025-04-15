import { NextResponse } from 'next/server';
import { testConnection } from '../../models/database.js';

// API endpoint pour tester la connexion à la base de données
export async function GET() {
  try {
    const connected = await testConnection();
    
    if (connected) {
      return NextResponse.json({ 
        success: true, 
        message: 'Connexion à SQL Server établie avec succès' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Impossible de se connecter à SQL Server' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors du test de connexion:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur lors du test de connexion: ' + error.message 
    }, { status: 500 });
  }
}
