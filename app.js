import express from 'express';
import pool from './db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Exemple de route
// app.use('/volunteers', volunteersRoutes);
// app.use('/associations', associationsRoutes);

// Test de route
app.get('/api/volunteers', async (req, res) => {
  pool.query('SELECT * FROM volunteers', (err, data) => {
    if (err) {
      console.log("Erreur :", err);
      return res.status(500).send(err);
    }
    console.log("Requête réussie sur /api/volunteers");
    res.json(data.rows || data); // selon le driver pg ou mysql
  });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
