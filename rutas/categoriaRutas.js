const express = require('express');
const categoriaControlador = require('../controladores/categoriaControlador');

const router = express.Router();

router.get('/ingresar-categoria',categoriaControlador.create_get);
router.post('/ingresar-categoria',categoriaControlador.create_post);
router.put('/editar-categoria/:id',categoriaControlador.editar);

module.exports = router;
