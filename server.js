const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const gamesRoutes = require('./routes/games');
const reviewsRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/juegos', gamesRoutes);
app.use('/api/reviews', reviewsRoutes);

// Ruta de prueba opcional
app.get('/', (req, res) => {
  res.send('GameTracker backend funcionando 🎮');
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB', err);
  });
