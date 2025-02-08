const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Importam les configuracions
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes') // Importar las rutas
const plantRoutes = require('./routes/plantRoutes') // Importar las rutas de plantas
const itemsRoutes = require('./routes/itemsRoutes') // Importa las rutas de los ítems

const app = express()
const PORT = process.env.PORT || 3000

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Juego de Plantas',
      version: '1.0.0',
      description:
        'Documentació de la API per a gestionar plantes, usuaris, ítems, etc.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Rutas de tus controladores
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Rutas para servir la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Configuración de middleware
app.use(cors())
app.use(bodyParser.json())

// Rutas
app.use('/usuaris', userRoutes) // Ruta para usuarios
app.use('/plantas', plantRoutes) // Ruta para plantas
app.use('/items', itemsRoutes) // Rutas de ítems
app.use('/items_usuaris', itemsRoutes) // Rutas de ítems

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
