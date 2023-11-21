const express = require('express');
const modalidadControlador = require('../controladores/modalidadControlador');

const router = express.Router();

router.get('/gestion-modalidad',modalidadControlador.index)
router.get('/ingresar-modalidad',modalidadControlador.create_get);
router.post('/ingresar-modalidad',modalidadControlador.create_post);
router.put('/editar-modalidad/:id',modalidadControlador.editar);
router.delete('/eliminar-modalidad/',modalidadControlador.eliminar);

module.exports = router;
