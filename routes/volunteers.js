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

// POST : AJOUTER un volunteer
router.post('/', async (req, res) => {
  const { firstname, lastname, email, password, location } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO volunteers 
        (firstname, lastname, email, password, location, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [firstname, lastname, email, password, location]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout du bénévole :", err);
    res.status(500).json({ error: "Erreur lors de l'ajout du bénévole" });
  }
});

// PATCH : MODIFIER un volunteer
router.patch('/:id', async (req, res) => {
  const volunteerId = req.params.id;
  const data = req.body;
  try {
    const keys = Object.keys(data);
    if (keys.length === 0) return res.status(400).json({ message: "Aucune donnée à mettre à jour." });

    const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const values = [...Object.values(data), volunteerId];

    const result = await pool.query(
      `UPDATE volunteers SET ${fields} WHERE id = $${keys.length + 1} RETURNING *`,
      values
    );

    if (result.rowCount === 0) return res.status(404).json({ message: "Volontaire non trouvé." });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur PATCH :", err);
    res.status(500).send("Erreur serveur");
  }
});

// DELETE : SUPPRIMER un bénévole et ses collections liées (obligatoire à cause des FK)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Étape 1 : Supprimer les collections associées à ce bénévole
    await pool.query('DELETE FROM collections WHERE volunteer_id = $1', [id]);

    // Étape 2 : Supprimer le bénévole lui-même
    const result = await pool.query('DELETE FROM volunteers WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bénévole non trouvé' });
    }
    res.json({ message: 'Bénévole et collectes associées supprimés avec succès' });
  } catch (err) {
    console.error("Erreur DELETE :", err);
    res.status(500).json({ error: 'Erreur lors de la suppression du bénévole' });
  }
});


module.exports = router;





//exemple de Vi sur PATCH
// router.patch('/:id', async (req, res)=>{
//   const volunteerId = req.params.id;
//   const data = req.body;

//   console.log(data);
  
//   try{
//     // const result = await pool.query('SELECT * FROM volunteers WHERE id = $1', [volunteerId]);
    
//     // res.json(result.rows);
//   }catch (err){
//     console.error("Erreur lors de la récupération du volontaire :", err);
//     res.status(500).send("Erreur serveur");
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
