const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Habilita CORS para todas as origens
app.use(cors());

// Permite receber JSON
app.use(express.json());

// Rotas da calculadora
const calculadoraRoutes = require('./routes/calculadora');
app.use('/api', calculadoraRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
