const db = require('../config/db') // Importar la configuración de la base de datos

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Esta ruta obtiene todos los usuarios registrados en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del usuario.
 *                   nom:
 *                     type: string
 *                     description: Nombre del usuario.
 *                   correu:
 *                     type: string
 *                     description: Correo electrónico del usuario.
 *                   contrasenya:
 *                     type: string
 *                     description: Contraseña del usuario.
 *                   edat:
 *                     type: integer
 *                     description: Edad del usuario.
 *                   nacionalitat:
 *                     type: string
 *                     description: Nacionalidad del usuario.
 *                   codiPostal:
 *                     type: string
 *                     description: Código postal del usuario.
 *                   imatgePerfil:
 *                     type: string
 *                     description: URL de la imagen de perfil del usuario.
 *       500:
 *         description: Error en el servidor al obtener los usuarios.
 */
exports.getAllUsers = (req, res) => {
  const query = 'SELECT * FROM usuaris'
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
}

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Esta ruta obtiene un usuario específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del usuario.
 *                 nom:
 *                   type: string
 *                   description: Nombre del usuario.
 *                 correu:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *                 contrasenya:
 *                   type: string
 *                   description: Contraseña del usuario.
 *                 edat:
 *                   type: integer
 *                   description: Edad del usuario.
 *                 nacionalitat:
 *                   type: string
 *                   description: Nacionalidad del usuario.
 *                 codiPostal:
 *                   type: string
 *                   description: Código postal del usuario.
 *                 imatgePerfil:
 *                   type: string
 *                   description: URL de la imagen de perfil del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor al obtener el usuario.
 */
exports.getUserById = (req, res) => {
  const { id } = req.params
  const query = 'SELECT * FROM usuaris WHERE id = ?'
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(result[0])
  })
}

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Esta ruta permite crear un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nombre del usuario.
 *               correu:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               contrasenya:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               edat:
 *                 type: integer
 *                 description: Edad del usuario.
 *               nacionalitat:
 *                 type: string
 *                 description: Nacionalidad del usuario.
 *               codiPostal:
 *                 type: string
 *                 description: Código postal del usuario.
 *               imatgePerfil:
 *                 type: string
 *                 description: URL de la imagen de perfil del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del nuevo usuario.
 *                 nom:
 *                   type: string
 *                   description: Nombre del usuario.
 *                 correu:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *                 contrasenya:
 *                   type: string
 *                   description: Contraseña del usuario.
 *                 edat:
 *                   type: integer
 *                   description: Edad del usuario.
 *                 nacionalitat:
 *                   type: string
 *                   description: Nacionalidad del usuario.
 *                 codiPostal:
 *                   type: string
 *                   description: Código postal del usuario.
 *                 imatgePerfil:
 *                   type: string
 *                   description: URL de la imagen de perfil del usuario.
 *       500:
 *         description: Error en el servidor al crear el usuario.
 */
exports.createUser = (req, res) => {
  const {
    nom,
    correu,
    contrasenya,
    edat,
    nacionalitat,
    codiPostal,
    imatgePerfil,
  } = req.body
  const query =
    'INSERT INTO usuaris (nom, correu, contrasenya, edat, nacionalitat, codiPostal, imatgePerfil) VALUES (?, ?, ?, ?, ?, ?, ?)'
  db.query(
    query,
    [nom, correu, contrasenya, edat, nacionalitat, codiPostal, imatgePerfil],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res
        .status(201)
        .json({
          id: result.insertId,
          nom,
          correu,
          contrasenya,
          edat,
          nacionalitat,
          codiPostal,
          imatgePerfil,
        })
    },
  )
}

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Esta ruta permite actualizar un usuario específico en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nombre del usuario.
 *               correu:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               contrasenya:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               edat:
 *                 type: integer
 *                 description: Edad del usuario.
 *               nacionalitat:
 *                 type: string
 *                 description: Nacionalidad del usuario.
 *               codiPostal:
 *                 type: string
 *                 description: Código postal del usuario.
 *               imatgePerfil:
 *                 type: string
 *                 description: URL de la imagen de perfil del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor al actualizar el usuario.
 */
exports.updateUser = (req, res) => {
  const { id } = req.params
  const {
    nom,
    correu,
    contrasenya,
    edat,
    nacionalitat,
    codiPostal,
    imatgePerfil,
  } = req.body
  const query =
    'UPDATE usuaris SET nom = ?, correu = ?, contrasenya = ?, edat = ?, nacionalitat = ?, codiPostal = ?, imatgePerfil = ? WHERE id = ?'
  db.query(
    query,
    [
      nom,
      correu,
      contrasenya,
      edat,
      nacionalitat,
      codiPostal,
      imatgePerfil,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: 'Usuario actualizado correctamente' })
    },
  )
}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Esta ruta permite eliminar un usuario específico de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor al eliminar el usuario.
 */
exports.deleteUser = (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM usuaris WHERE id = ?'
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ message: 'Usuario eliminado correctamente' })
  })
}
