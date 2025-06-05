require('dotenv').config();
const express = require('express');
const cors = require("cors");
const pool = require('./db');
const app = express();

app.use(express.json()); // MIDDLEWARE global
app.use(express.urlencoded({ extended: true })); // pour encoder

const port = 3001; 

app.use(cors({
  origin: `http://localhost: ${port}`,
  credentials: true,
}));



console.log('1');
// importer tout le contenu du fichier associations.js dans app.js
const volunteersRoutes = require('./routes/volunteers');
const associationsRoutes = require('./routes/associations');
const citiesRoutes = require('./routes/cities');
const wastesRoutes = require('./routes/wastes');
const collectionsRoutes = require('./routes/collections');
const leaderboardRoutes = require('./routes/leaderboard');

console.log('2');
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method}q ${req.url}`);
  next();
});

app.use('/volunteers', volunteersRoutes);
app.use('/volunteers/:id', volunteersRoutes);
app.use('/associations', associationsRoutes);
app.use('/cities' , citiesRoutes);
app.use('/wastes' , wastesRoutes);
app.use('/collections', collectionsRoutes);
app.use('/leaderboard', leaderboardRoutes);

console.log('3');
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

console.log('4');
// pour lancer le serveur
app.listen(port, () => {
  console.log(`serveur démarré sur le port  ${port}`);
});
