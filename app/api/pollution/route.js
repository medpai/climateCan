import { NextResponse } from 'next/server';
import pollutionService from '../../services/pollutionService';

// Récupérer toutes les données de pollution pour une année spécifique
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || '2023', 10);
    const province = searchParams.get('province');
    
    let data;
    
    if (province) {
      // Récupérer les données pour une province spécifique
      data = await pollutionService.getByProvinceAndYear(province, year);
    } else {
      // Récupérer toutes les données pour l'année spécifiée
      data = await pollutionService.getAllByYear(year);
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur lors de la récupération des données de pollution:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
