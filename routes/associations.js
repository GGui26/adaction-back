

// Route avec toutes les associations
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res)=>{
  try{
    const results = await pool.query('SELECT * FROM associations');
    // const results = await pool.query('SELECT name, description, points FROM associations');
    

    res.json(results.rows);
  } catch(err) {
    res.status(500).json({error: 'Erreur serveur' });
  };
});

module.exports = router;

// créer une route qui résume la page web donate (dans ce cas sans la colonne points_conversion_euro)







