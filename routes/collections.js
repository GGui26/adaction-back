const express = require('express');
const pool = require('../db');
const router = express.Router();
router.use(express.json()); // a ne pas oublier pour les POST

// GET : Toutes les collectes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM collections');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des collectes' });
    }
});

// GET : récupère une collecte par son ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM collections WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Collecte non trouvée' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la collecte' });
    }
});

// POST : création d'une nouvelle collecte et association avec un bénévole
router.post('/', async (req, res) => {
    const { name, description, volunteer_id } = req.body;
    if (!volunteer_id) {
        return res.status(400).json({ error: "volunteer_id requis" });
    }
    try {
        // Vérifier que le bénévole existe
        const volunteerCheck = await pool.query(
            'SELECT id FROM volunteer WHERE id = $1',
            [volunteer_id]
        );
        if (volunteerCheck.rows.length === 0) {
            return res.status(404).json({ error: "Bénévole non trouvé" });
        }
        // Créer la collecte et l'associer au bénévole
        const result = await pool.query(
            'INSERT INTO collections (name, description, volunteer_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, volunteer_id]
            // $1, $2, $3 sont des valeurs qui protègent des injections SQL : cyberattack -> insertion de code infecté qui permet
            // de récuperer/visualiser les données dans une table
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création de la collection' });
    }
});

// PUT : Mise à jour d'une collecte existante
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE collections SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Collecte non trouvée' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la collecte' });
    }
});

// DELETE : Supprime une collecte
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM collections WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Collecte non trouvée' });
        }
        res.json({ message: 'Collection supprimée' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la collecte' });
    }
});

module.exports = router;