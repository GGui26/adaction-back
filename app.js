require('dotenv').config();
const express = require('express');
const cors = require("cors");
const pool = require('./db');
const app = express();

app.use(express.json()); // MIDDLEWARE global
app.use(express.urlencoded({ extended: true })); // pour encoder

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

const port = 3001; 


// importer tout le contenu du fichier associations.js dans app.js
const volunteersRoutes = require('./routes/volunteers');
const associationsRoutes = require('./routes/associations');
const citiesRoutes = require('./routes/cities');
const wastesRoutes = require('./routes/wastes');





app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method}q ${req.url}`);
  next();
});

app.use('/volunteers', volunteersRoutes);
app.use('/associations', associationsRoutes);
app.use('/cities' , citiesRoutes);
app.use('/wastes' , wastesRoutes);


app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));


// pour lancer le serveur
app.listen(port, () => {
  console.log(`serveur démarré sur le port  ${port}`);
});
