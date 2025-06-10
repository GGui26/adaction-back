const express = require('express');
const router = express.Router();
const pool = require('../db');
router.use(express.json());

router.post('/connexion', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM volunteers WHERE firstname = 'Julien' AND password = 'Marseille_P@ss'"
    );    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }    const volunteer = result.rows[0];
    res.json(volunteer);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;