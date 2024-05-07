const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asumiendo que el modelo se llama User

// Create
router.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all
router.get("/user", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read by ID
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.patch("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedRowsCount, updatedRows] = await User.update(req.body, {
            where: { userid: id },
            returning: true,
        });
        res.json(updatedRows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { userid: id } });
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
