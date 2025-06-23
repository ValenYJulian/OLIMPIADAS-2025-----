const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/pedidos
router.post('/', (req, res) => {
  const { id_usuario, productos } = req.body;

  if (!productos || productos.length === 0) {
    return res.status(400).json({ success: false, mensaje: 'El carrito está vacío' });
  }

  const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

  productos.forEach((producto) => {
    const { id_producto, cantidad, subtotal } = producto;

    const query = `
      INSERT INTO pedido (ID_Usuario, ID_Producto, Cantidad, Subtotal, Fecha)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [id_usuario, id_producto, cantidad, subtotal, fecha], (err, result) => {
      if (err) {
        console.error('❌ Error al guardar el pedido:', err);
        // No detenemos todo, pero podrías manejar errores individualmente
      }
    });
  });

  res.json({ success: true, mensaje: 'Pedido registrado correctamente' });
});
// GET /api/pedidos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM pedido';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener pedidos:', err);
      return res.status(500).json({ success: false, mensaje: 'Error al consultar pedidos' });
    }

    res.json({ success: true, pedidos: results });
  });
});
module.exports = router;