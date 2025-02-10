const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Importamos la configuración de la BD
const db = require('./config/db')

// Importamos las rutas
const userRoutes = require('./routes/userRoutes')
const plantRoutes = require('./routes/plantRoutes')
const itemsRoutes = require('./routes/itemsRoutes')

const app = express()
const PORT = process.env.PORT

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Juego de Plantas',
      version: '1.0.0',
      description:
        'Documentación de la API para gestionar plantas, usuarios, ítems, etc.',
    },
    servers: [
      {
        url: process.env.API_URL || 'https://apiplantes09.azurewebsites.net', // URL en Azure
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Configuración de middleware
app.use(cors())
app.use(bodyParser.json())

// Rutas
app.use('/usuaris', userRoutes)
app.use('/plantas', plantRoutes)
app.use('/items', itemsRoutes)

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Error interno del servidor' })
})

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`)
})
