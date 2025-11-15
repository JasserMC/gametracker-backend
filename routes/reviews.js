const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

/**
 * GET /api/reviews?juegoId=ID
 */
router.get("/", async (req, res) => {
  try {
    const { juegoId } = req.query;
    const filtro = juegoId ? { juegoId } : {};
    const reseñas = await Review.find(filtro).sort({ createdAt: -1 });
    res.json(reseñas);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
});

/**
 * POST /api/reviews
 */
router.post("/", async (req, res) => {
  try {
    console.log("📩 POST /api/reviews body:", req.body);   // <--- AÑADIDO

    const { juegoId, autor, texto, puntuacion } = req.body;

    if (!juegoId || !texto) {
      return res
        .status(400)
        .json({ message: "juegoId y texto son obligatorios" });
    }

    const nuevaReseña = new Review({
      juegoId,
      autor,
      texto,
      puntuacion,
    });

    const guardada = await nuevaReseña.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error("Error al crear reseña:", error);
    res.status(500).json({ message: "Error al crear reseña" });
  }
});

module.exports = router;
