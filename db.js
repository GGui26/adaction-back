// 1. Le code importé par NEON pour configurer la BDD créée :
require("dotenv").config();

// 2. Importer le client PostgreSQL
const { Pool } = require("pg");

// 3. Récupérer les variables de connexion depuis process.env (chargées par dotenv)
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// 4. Créer un pool de connexions à la base de données
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432, // Le port standard de PostgreSQL
  ssl: {
    require: true, // Nécessaire pour Neon, assure une connexion sécurisée
  },
});

// 5. Fonction de test de connexion (optionnelle mais très utile pour vérifier)
async function getPgVersion() {
  const client = await pool.connect(); // Obtient un client du pool
  try {
    const result = await client.query('SELECT version()'); // Exécute une simple requête
    console.log(result.rows[0]); // Affiche la version de PostgreSQL
  } finally {
    client.release(); // Libère le client pour qu'il retourne au pool
  }
}
// 6. Appeler la fonction de test pour vérifier la connexion au démarrage de l'application
getPgVersion();

// 7. ça me demande (Optionnel) d'Exporter le 'pool' pour l'utiliser dans d'autres modules de votre application
// module.exports = pool;