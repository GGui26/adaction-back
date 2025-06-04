const express = require('express');
const pool = require('../db');

const router = express.Router();
router.use(express.json()); // nécessaire pour les POST car on solicite le body JSON


// GET : TOUS LES VOLUNTEERS
router.get('/', async (req, res)=>{
  try{
    const result = await pool.query('SELECT * FROM volunteers');
    res.json(result.rows);
  }catch (err){
    console.error("Erreur PostgreSQL : ", err);
    res.status(500).send("Erreur lors de la récupération des bénévoles");
  }return router;
});

// GET : UN VOLUNTEER PAR ID
router.get('/:id', async (req, res)=>{
  const volunteerId = req.params.id;
  try{
    const result = await pool.query('SELECT * FROM volunteers WHERE id = $1', [volunteerId]);
    if (result.rows.length === 0){
      return res.status(404).json({message: "Volontaire non trouvé"});
    }
    res.json(result.rows);
  }catch (err){
    console.error("Erreur lors de la récupération du volontaire :", err);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;


// ancienne version json
// router.get('/', (req, res) => {
//   let results = volunteers;

//   for (const [key, value] of Object.entries(req.query)) {
//     results = results.filter(volunteer =>
//       volunteer[key] && volunteer[key].toString().toLowerCase() === value.toLowerCase()
//     );
//   }
//   if (results.length > 0) {
//     res.json(results);
//   } else {
//     res.status(404).json({ error: 'Aucun volontaire trouvé avec ces critères' });
//   }
// });

// GET : un volunteer par son ID
// router.get('/:id', (req, res) => {
//   const volunteerId = parseInt(req.params.id);
//   const volunteer = volunteers.find(v => v.id === volunteerId);

//   if (!volunteer) {
//     return res.status(404).json({ error: 'Volontaire non trouvé' });
//   }
//   res.json(volunteer);
// });


// POST : ajouter un volunteer
// router.post('/', (req, res) => {
//    console.log("body reçu", req.body);
//   const newVolunteer = {
//     id: req.body.id,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password,
//     location: req.body.location,
//     waste_collection: req.body.waste_collection,
//     total_points: req.body.total_points,
//     donated_points: req.body.donated_points,
//     created_at: req.body.created_at,
//     updated_at: req.body.updated_at || ""
//   };
//   ;
//   volunteers.push(newVolunteer);
//   res.status(201).json(newVolunteer);
// });


// PUT : updater un volunteer par son ID
// router.put('/:id', (req, res) => {
//   const volunteerId = parseInt(req.params.id);
//   const index = volunteers.findIndex(v => v.id === volunteerId);

//   if (index === -1) {
//     return res.status(404).json({ error: 'Volontaire non trouvé' });
//   }

//   // On met à jour seulement les champs reçus dans req.body
//   volunteers[index] = {
//     ...volunteers[index],
//     ...req.body,
//     id: volunteerId // on s'assure que l'id ne change pas
//   };
//   res.json(volunteers[index]);
// });


// DELETE : supprimer un volunteer par ID
// router.delete('/:id', (req, res) => {
//   const volunteerId = parseInt(req.params.id);
//   const index = volunteers.findIndex(v => v.id === volunteerId);

//   console.log('Index trouvé :', index); 

//   if (index !== -1) {
//     const deletedVolunteer = volunteers.splice(index, 1)[0];
//     res.json({ message: 'Volontaire supprimé', volunteer: deletedVolunteer });
//   } else {
//     res.status(404).json({ error: 'Volontaire non trouvé' });
//   }
// });

// EXEMPLES RECHERCHE GET avec les query params
// http://localhost:3001/volunteers
// http://localhost:3001/volunteers?firstname=Jean
// http://localhost:3001/volunteers?id=7
// http://localhost:3001/volunteers?firstname=Jean&lastname=Durand

// EXEMPLE POST
// http://localhost:3001/volunteers

// EXEMPLE PUT en cherchant par ID
// http://localhost:3001/volunteers/4

// EXEMPLE DELETE en cherchant par ID
// http://localhost:3001/volunteers/7


 
