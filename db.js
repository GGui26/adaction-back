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
module.exports = pool;
