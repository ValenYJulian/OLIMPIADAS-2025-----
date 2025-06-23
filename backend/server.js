const mysql = require('mysql2/promise');

async function conectar() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',       
      password: '', 
      database: 'vuelos'
    });
    console.log('Conectado correctamente');
  } catch (err) {
    console.error('Error de conexión:', err);
  }
}
conectar();