require('dotenv').config()
console.log('DB_HOST:', process.env.DB_HOST) // Verifica que esta variable esté correctamente cargada

const sql = require('mssql')

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST, // Aquí es donde debería estar el valor correcto
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true, // Para conexiones en Azure
    trustServerCertificate: false, // Cambiar a 'true' si tienes problemas con el certificado
  },
}

// Intentar la conexión
sql
  .connect(config)
  .then(() => {
    console.log('✅ Conectado a la base de datos')

    // Realizar una consulta SQL para obtener algunos datos (ajusta el nombre de la tabla según tu base de datos)
    return sql.query('SELECT TOP 5 * FROM usuaris') // Cambia 'Plantas' por el nombre de tu tabla
  })
  .then((result) => {
    console.log('Datos obtenidos de la base de datos:', result.recordset)
  })
  .catch((err) => {
    console.error(
      '❌ Error al conectar con la base de datos o ejecutar la consulta:',
      err.message,
    )
  })
