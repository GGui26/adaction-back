

// const express = require('express'); // importer la librairie express.js

// const router = express.Router(); // créer un routeur 
// router.use(express.json()); // nécessaire pour les POST car on solicite le body JSON

// const associations = require('../associations.json');

// // function getAssociations(request, response) {
// //     console.log("Fonction GET associations");
// //     response.send(associations);
// // }

// // GET : TOUTES LES ASSOS OU AVEC FILTRES
// router.get('/', (req, res) => {
//     let results = associations;

// //     for (const [key, value] of Object.entries(req.query)) {
// //         results = results.filter(association =>
// //         association[key] && association[key].toString().toLowerCase() === value.toLowerCase()
// //     );
// //   }
//   if (results.length > 0) {
//     res.json(results);
//   } else {
//     res.status(404).json({ error: 'Aucune association trouvée' });
//   }
// });



// module.exports = router; // export veut dire publier les routes et les rendre accessible depuis les autres fichiers JS


//=======================essayer une autre approche avce Neon

const express = require('express');
const router = express.Router();

module.exports = (pool)=> {

    router.get('/associations' , async(req , res)=>{
      try{
          const result = await pool.query ('SELECT * FROM association')
          res.json(result.rows);
      } catch (err){
        console.error('Erreur lors de la récupérations des infos:', err);
        res.status(500).json({error: 'Erreur serveur.'});
      }
    });
    return router;
};