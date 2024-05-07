const express = require('express');
const router = express.Router();
const { pool } = require('../db/db'); // Importa el pool de conexión a la base de datos

// Create
router.post("/Products", async (req, res) => {
    try {
        const { name, price } = req.body;
        const client = await pool.connect();
        const result = await client.query('CALL insertproduct($1, $2)', [name, price]);
        client.release();
        res.json({ message: 'Producto creado correctamente', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all
router.get("/Products", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM get_all_products()');
        client.release();
        res.json(result.rows ); // Aquí asignamos result.rows a la clave "data"
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read by ID
router.get("/Products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM get_product_by_id($1)', [id]);
        client.release();
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update
router.patch("/Products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const client = await pool.connect();
        const result = await client.query('CALL updateproduct($1, $2, $3)', [id, name, price]);
        client.release();
        res.json({ message: 'Producto actualizado correctamente', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete("/Products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        await client.query('CALL deleteproduct($1)', [id]);
        client.release();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
