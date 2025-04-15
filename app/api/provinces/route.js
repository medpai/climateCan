import { NextResponse } from 'next/server';

// Liste des provinces canadiennes
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

// Récupérer la liste des provinces
export async function GET() {
  try {
    return NextResponse.json({ success: true, data: provinces });
  } catch (error) {
    console.error('Erreur lors de la récupération des provinces:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des provinces' },
      { status: 500 }
    );
  }
}
