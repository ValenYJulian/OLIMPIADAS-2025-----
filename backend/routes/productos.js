const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/productos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM producto';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
    }

    res.json({ success: true, productos: results });
  });
});

module.exports = router;