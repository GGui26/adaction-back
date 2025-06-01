const express = require('express'); // importer la librairie express.js

const router = express.Router(); // créer un routeur 
router.use(express.json()); // nécessaire pour les POST car on solicite le body JSON

const volunteers = require('../volunteers.json');

function getManageUsers(request, response) {
    console.log("Fonction GET manage-users");
    response.send(volunteers);
}

router.get('/', getManageUsers);


// router.get('/', (request, response) => {
//     console.log("Fonction GET manage-users");
//     response.send("route dans le fichier manager-users.js");
// }
// );

module.exports = router; // export veut dire publier les routes et les rendre accessible depuis les autres fichiers JS

