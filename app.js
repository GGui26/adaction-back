// 1. Le code importé par NEON pour configurer la BDD créée :
require('dotenv').config();

// 2. Importer le client PostgreSQL
const { Pool } = require('pg');

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
    console.log("Connexion à la base de données réussie !");
    console.log(result.rows[0]); // Affiche la version de PostgreSQL
  } catch (err) {
    console.error("Erreur de connexion à la base de données ou d'exécution de la requête :", err);
  } finally {
    client.release(); // Libère le client pour qu'il retourne au pool
  }
}

// 6. Appeler la fonction de test pour vérifier la connexion au démarrage de l'application
getPgVersion();

// 7. ça me demande (Optionnel) d'Exporter le 'pool' pour l'utiliser dans d'autres modules de votre application
// module.exports = pool;





const express = require('express');
// require('dotenv').config();  DEJA ECRIT EN LIGNE 2
const cors = require('cors');
const app = express();

const volunteersRoutes = require('./routes/volunteers');

app.use(cors());
app.use(express.json()); // MIDDLEWARE global
app.use(express.urlencoded({ extended: true })); // pour encoder


app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method}q ${req.url}`);
  next();
});

// router
app.use('/volunteers', volunteersRoutes);

const port = 3001;

// pour lancer le serveur
app.listen(port, () => {
  console.log(`serveur démarré sur le port  ${port}`)
})

// test de route
app.get('/test', (req, res) => {
  console.log("Route /test appelée !");
  res.send("Test OK");
});


