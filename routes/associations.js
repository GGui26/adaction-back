

const express = require('express'); // importer la librairie express.js

const router = express.Router(); // créer un routeur 
router.use(express.json()); // nécessaire pour les POST car on solicite le body JSON

const associations = require('../associations.json');

// function getAssociations(request, response) {
//     console.log("Fonction GET associations");
//     response.send(associations);
// }

// GET : TOUTES LES ASSOS OU AVEC FILTRES
router.get('/', (req, res) => {
    let results = associations;

//     for (const [key, value] of Object.entries(req.query)) {
//         results = results.filter(association =>
//         association[key] && association[key].toString().toLowerCase() === value.toLowerCase()
//     );
//   }
  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ error: 'Aucune association trouvée' });
  }
});







module.exports = router; // export veut dire publier les routes et les rendre accessible depuis les autres fichiers JS
