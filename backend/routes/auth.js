const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT ID_Usuario FROM usuario WHERE Usuario = ? AND Contraseña = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("ERROR EN LOGIN:", err);
      return res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
    }

    if (results.length > 0) {
      res.json({ success: true, mensaje: "Login exitoso", usuario: results[0] });
    } else {
      res.status(401).json({ success: false, mensaje: 'Credenciales inválidas' });
    }
  });
});
router.post('/registro', (req, res) => {
  const { email, password } = req.body;

  const query = "INSERT INTO usuario (Usuario, Contraseña) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error al registrar:", err);
      return res.status(500).json({ success: false, mensaje: 'Error al registrar usuario' });
    }

    res.json({ success: true, mensaje: 'Usuario registrado correctamente' });
  });
});
module.exports = router;