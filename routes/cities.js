const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res)=>{
  try{
    const results = await pool.query('SELECT * FROM cities');
    res.json(results.rows);
    
  } catch(err) {
    res.status(500).json({error: 'Erreur serveur' });
  };
});

module.exports = router;
