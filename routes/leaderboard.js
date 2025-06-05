

// Route avec toutes les associations
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res)=>{
  try{
    const results = await pool.query(`
      SELECT v.firstname,
      SUM(c.number_collections) AS total_collections
      FROM collections c
      JOIN volunteers v ON v.id = c.volunteer_id
      GROUP BY v.id, v.firstname
      ORDER BY total_collections DESC
    `);
    res.json(results.rows);
  } catch(err) {
    res.status(500).json({error: 'Erreur serveur' });
  };
});

module.exports = router;
