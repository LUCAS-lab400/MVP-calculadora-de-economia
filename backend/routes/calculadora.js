const express = require('express');
const router = express.Router();
const db = require('../db');

// Salvar sessão
router.post('/salvarSessao', (req, res) => {
  const { meta, objetivo, total_gastos, gastos } = req.body;

  const sql = `
    INSERT INTO tabelas_bd_calculo_economia (meta, objetivo, total_gastos, gastos)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [meta, objetivo, total_gastos, JSON.stringify(gastos)], (err) => {
    if (err) {
      console.error('Erro ao salvar sessão:', err);
      return res.status(500).json({ error: 'Erro ao salvar sessão no banco.' });
    }
    res.json({ message: 'Sessão salva com sucesso!' });
  });
});

// Listar sessões
router.get('/listarSessoes', (req, res) => {
  db.query('SELECT * FROM tabelas_bd_calculo_economia', (err, results) => {
    if (err) {
      console.error('Erro ao listar sessões:', err);
      return res.status(500).json({ error: 'Erro ao buscar sessões.' });
    }
    res.json(results);
  });
});

module.exports = router;


