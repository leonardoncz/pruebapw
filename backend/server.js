const { sequelize } = require("./models");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

sequelize.authenticate()
  .then(() => console.log("Conexión exitosa a PostgreSQL 🚀"))
  .catch(err => console.error("Error al conectar:", err));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const ordenRoutes = require('./routes/ordenRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
// const categoryRoutes = require('./routes/categoryRoutes'); // Cuando lo crees
// const userRoutes = require('./routes/userRoutes');       // Cuando lo crees

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite peticiones desde React (localhost:5173)
app.use(express.json()); // Permite leer JSON del body
app.use(morgan('dev')); // Muestra peticiones en consola

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordenRoutes);
app.use('/api/categories', categoryRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/users', userRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('API de PetAdopt funcionando 🐶');
});

sequelize.sync({ alter: true })
  .then(() => console.log("Tablas sincronizadas correctamente"))
  .catch(err => console.error("Error al sincronizar tablas:", err));

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});