const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Asumiendo que el modelo se llama Order

// Create
router.post("/Order", async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all
router.get("/Order", async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read by ID
router.get("/Order/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.patch("/Order/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedRowsCount, updatedRows] = await Order.update(req.body, {
            where: { orderid: id },
            returning: true,
        });
        res.json(updatedRows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete("/Order/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Order.destroy({ where: { orderid: id } });
        res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
