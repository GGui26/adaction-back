
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res)=>{
  try{
    const results = await pool.query(`
      SELECT v.firstname, v.lastname, v.location
      FROM volunteers
    `);
    res.json(results.rows);
  } catch(err) {
    res.status(500).json({error: 'Erreur serveur' });
  };
});

module.exports = router;


// modifier un bénévole



// router.use(express.json()); // nécessaire pour les POST car on solicite le body JSON
// const volunteers = require('../volunteers.json');

// function getManageUsers(request, response) {
//     console.log("Fonction GET manage-users");
//     response.send(volunteers);
// }

// router.get('/', getManageUsers);


// router.get('/', (request, response) => {
//     console.log("Fonction GET manage-users");
//     response.send("route dans le fichier manager-users.js");
// }
// );



