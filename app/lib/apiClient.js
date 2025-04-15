'use client';

// Client API pour interagir avec le backend depuis le frontend
const apiClient = {
  // Fonction générique pour les requêtes GET
  async get(endpoint, params = {}) {
    try {
      // Construire l'URL avec les paramètres de requête
      const url = new URL(`/api/${endpoint}`, window.location.origin);
      
      // Ajouter les paramètres de requête
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
      
      // Effectuer la requête
      const response = await fetch(url.toString());
      
      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Convertir la réponse en JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de la requête GET vers ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Fonction générique pour les requêtes POST
  async post(endpoint, body = {}) {
    try {
      const url = new URL(`/api/${endpoint}`, window.location.origin);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de la requête POST vers ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Méthodes spécifiques pour chaque type de données
  
  // Test de connexion à la base de données
  async testDatabaseConnection() {
    return this.get('test-connection');
  },
  
  // Initialiser la base de données avec des données de test
  async seedDatabase() {
    return this.get('seed-data');
  },
  
  // Provinces
  async getProvinces() {
    return this.get('provinces');
  },
  
  // Température
  async getTemperatures(params = {}) {
    return this.get('temperature', params);
  },
  
  // Pollution
  async getPollution(params = {}) {
    return this.get('pollution', params);
  },
  
  // Précipitations
  async getPrecipitation(params = {}) {
    return this.get('precipitation', params);
  },
  
  // Analyses
  async getAnalysis(params = {}) {
    return this.get('analysis', params);
  }
};

export default apiClient;
