const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const volunteersRoutes = require('./routes/volunteers');

app.use(cors());
app.use(express.json()); // MIDDLEWARE global
app.use(express.urlencoded({ extended: true })); // pour encoder


app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
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


