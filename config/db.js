// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'test',
//   password: process.env.DB_PASSWORD || 'test',
//   database: process.env.DB_NAME || 'appplantes2',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error al conectar con la base de datos:', err.message);
//   } else {
//     console.log('Conectado a la base de datos');
//   }
// });

// module.exports = db;

// src/config/db.js

const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'appplantes2',
})

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message)
  } else {
    console.log('Conectado a la base de datos')
  }
})

module.exports = db
