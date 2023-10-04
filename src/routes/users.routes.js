const { Router } = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const router = new Router();

/* Admin */
router.get('/', getUsers); // Obtiene todos los usuarios

/* Users */
router.post('/', createUser); // Crea un nuevo usuario
router.get('/:uid', getUserById); // Obtiene un usuario por id
//router.put('/:uid', updateUser);  // Actualiza un usuario por id
router.delete('/:uid', deleteUser); // Elimina un usuario por id

module.exports = router;