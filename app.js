

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

const express = require('express');
// require('dotenv').config();  DEJA ECRIT EN LIGNE 2
const cors = require("cors");
const app = express();
const port = 3001; 

// importer tout le contenue du fichier associations.js dans app.js
// const volunteersRoutes = require('./routes/volunteers');
// const associationsRoutes = require('./routes/associations'); 

app.use(cors());
app.use(express.json()); // MIDDLEWARE global
app.use(express.urlencoded({ extended: true })); // pour encoder

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method}q ${req.url}`);
  next();
});

// router
//app.use('/volunteers'); // Pas besoin de mettre .js
//app.use('/associations' ,associationsRoutes ); //revoyer le traitement de cette route au fichier associations.js


// pour lancer le serveur
app.listen(port, () => {
  console.log(`serveur démarré sur le port  ${port}`);
});

// test de route
app.get("/volunteers", (req, res) => {
  pool.query('SELECT * FROM volunteers', (err, data) => {
    if (err) {
      console.log("coucou", err);
      return res.status(500).send(err);
    }
     console.log("coucou je suis bien dans la route");
    res.json(data);
  });
});

//=================================tenter autre chose avec Neon (route associations)

// app.js
require('dotenv').config(); // Charge les variables d'environnement du fichier .env
// const express = require('express'); déja ecrit en ligne 38
// const { Pool } = require('pg'); déja cité en ligne 5
//const cors = require('cors'); // déja cité ligne 40

// Importe le module de route des associations
const associationsRouter = require('./routes/associations'); // Notez le chemin relatif

// const app = express(); // déja cité en haut
// const port = process.env.PORT || 3001;

// Configuration de la connexion à la base de données Neon
// const pool = new Pool({
//     host: process.env.PGHOST,
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.PGDATABASE,
//     port: process.env.PGPORT,
//     ssl: {
//         rejectUnauthorized: false // Nécessaire pour les connexions SSL avec Neon
//     }
// });

// Middleware
// app.use(cors());
// app.use(express.json());



async function testAsso() {
    let client; // Déclarez le client ici pour qu'il soit accessible dans le bloc 'finally'
    try {
        client = await pool.connect(); // Obtient (attend) un client du pool
        const result = await client.query('SELECT version()'); // Exécute une simple requête
        console.log('Connecté à la base de données PostgreSQL !');
        console.log(result.rows[0]); // Affiche la version de PostgreSQL
    } catch (err) {
        // En cas d'erreur lors de la connexion ou de la requête
        console.error('Erreur de connexion à la base de données', err.stack);
    } finally {
        // Ce bloc s'exécute toujours, que l'opération ait réussi ou échoué
        if (client) { // Vérifiez que le client a bien été obtenu avant de le relâcher
            client.release(); // Libère le client pour qu'il retourne au pool de connexions
        }
    }
}

 testAsso();




// --- Nouvelle partie : Utilisation du routeur des associations ---

// "Monte" le routeur des associations.
// Toutes les routes définies dans associations.js seront préfixées par '/api'.
// Par exemple, 'router.get('/associations', ...)' dans associations.js
// deviendra accessible via 'http://localhost:3000/api/associations'.
app.use('/api', associationsRouter(pool)); // Passe l'instance du pool au routeur

// --- Fin de la nouvelle partie ---

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur backend écoutant sur http://localhost:3001`);
});
