const express = require("express");
const pool = require("../db");

const router = express.Router();
router.use(express.json());

// GET : LEADERBOARD : prénom du volunteer + nbre de collectes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT firstname FROM volunteers SUM from "
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Volontaire non trouvé" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération du volontaire :", err);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;

// créer une route qui résume la page web donate (dans ce cas sans la colonne points_conversion_euro)
// (Marine) review : Petit point Mardi de 5 min 