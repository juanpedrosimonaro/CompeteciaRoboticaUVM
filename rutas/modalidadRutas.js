const express = require('express');
const modalidadControlador = require('../controladores/modalidadControlador');

const router = express.Router();

router.get('/ingresar-modalidad',modalidadControlador.create_get);
router.post('/ingresar-modalidad',modalidadControlador.create_post);

module.exports = router;
