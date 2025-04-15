// Script pour vérifier les données des tables de température
const { 
  Temperature2021, 
  Temperature2022, 
  Temperature2023, 
  Temperature2024 
} = require('./models/schemas/index.js');
const { sequelize } = require('./models/database.js');
const { QueryTypes } = require('sequelize');

async function checkTables() {
  console.log('Vérification des tables de température...');
  
  try {
    // Vérifier si les tables existent et ont des données
    const tables = {
      2021: Temperature2021,
      2022: Temperature2022,
      2023: Temperature2023,
      2024: Temperature2024
    };
    
    for (const [year, model] of Object.entries(tables)) {
      try {
        // Vérifier si la table existe en comptant les entrées
        const count = await model.count();
        console.log(`Table temperature_${year}: ${count} enregistrements trouvés`);
        
        // Afficher un exemple de données si disponible
        if (count > 0) {
          const sample = await model.findOne();
          console.log(`Exemple de données pour ${year}:`, JSON.stringify(sample, null, 2));
        }
      } catch (error) {
        console.error(`Erreur lors de la vérification de la table temperature_${year}:`, error.message);
      }
    }
    
    // Vérifier les tables directement avec une requête SQL
    console.log('\nVérification des tables avec une requête SQL directe:');
    const tableQuery = `
      SELECT 
        t.name AS TableName,
        s.name AS SchemaName
      FROM 
        sys.tables t
      INNER JOIN 
        sys.schemas s ON t.schema_id = s.schema_id
      WHERE 
        t.name LIKE 'temperature_%'
    `;
    
    const tables2 = await sequelize.query(tableQuery, { type: QueryTypes.SELECT });
    console.log('Tables trouvées:', tables2);
    
    // Vérifier les colonnes de la table temperature_2023
    console.log('\nVérification des colonnes de temperature_2023:');
    const columnQuery = `
      SELECT 
        c.name AS ColumnName,
        t.name AS DataType
      FROM 
        sys.columns c
      INNER JOIN 
        sys.types t ON c.system_type_id = t.system_type_id
      WHERE 
        c.object_id = OBJECT_ID('temperature_2023')
    `;
    
    try {
      const columns = await sequelize.query(columnQuery, { type: QueryTypes.SELECT });
      console.log('Colonnes trouvées:', columns);
    } catch (error) {
      console.error('Erreur lors de la vérification des colonnes:', error.message);
    }
    
  } catch (error) {
    console.error('ERREUR lors de la vérification des tables:', error);
  } finally {
    // Fermer la connexion
    await sequelize.close();
  }
}

// Exécuter la vérification
checkTables();
