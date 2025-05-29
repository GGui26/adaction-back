const express = require('express');
const volunteers = require('../volunteers.json');

const router = express.Router();
router.use(express.json()); // nécessaire pour les POST car on solicite le body JSON


// GET : TOUS LES VOLUNTEERS OU AVEC FILTRES
router.get('/', (req, res) => {
  let results = volunteers;

  for (const [key, value] of Object.entries(req.query)) {
    results = results.filter(volunteer =>
      volunteer[key] && volunteer[key].toString().toLowerCase() === value.toLowerCase()
    );
  }
  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ error: 'Aucun volontaire trouvé avec ces critères' });
  }
});

// POST : ajouter un volunteer
router.post('/', (req, res) => {
   console.log("body reçu", req.body);
  const newVolunteer = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    waste_collection: req.body.waste_collection,
    total_points: req.body.total_points,
    donated_points: req.body.donated_points,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at || ""
  };
  ;
  volunteers.push(newVolunteer);
  res.status(201).json(newVolunteer);
});


// PUT : updater un volunteer par son ID
router.put('/:id', (req, res) => {
  const volunteerId = parseInt(req.params.id);
  const index = volunteers.findIndex(v => v.id === volunteerId);

  if (index === -1) {
    return res.status(404).json({ error: 'Volontaire non trouvé' });
  }

  // On met à jour seulement les champs reçus dans req.body
  volunteers[index] = {
    ...volunteers[index],
    ...req.body,
    id: volunteerId // on s'assure que l'id ne change pas
  };
  res.json(volunteers[index]);
});


// DELETE : supprimer un volunteer par ID
router.delete('/:id', (req, res) => {
  const volunteerId = parseInt(req.params.id);
  const index = volunteers.findIndex(v => v.id === volunteerId);

  console.log('Index trouvé :', index); 

  if (index !== -1) {
    const deletedVolunteer = volunteers.splice(index, 1)[0];
    res.json({ message: 'Volontaire supprimé', volunteer: deletedVolunteer });
  } else {
    res.status(404).json({ error: 'Volontaire non trouvé' });
  }
});


module.exports = router;



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


 
