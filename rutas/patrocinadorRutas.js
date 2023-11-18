const express = require('express');
const patrocinadorControlador = require('../controladores/patrocinadorControlador');

const router = express.Router();

router.get('/ingresar-patrocinador',patrocinadorControlador.create_get);
router.get('/patrocinadores',patrocinadorControlador.mostrarTodos);
router.post('/ingresar-patrocinador',patrocinadorControlador.create_post);
router.get('/patrocinadoresPorEquipo',patrocinadorControlador.mostrarPorEquipo);
// router.put('/editar-patrocinador/:id',patrocinadorControlador.editar);
// router.delete('/eliminar-patrocinador/',patrocinadorControlador.eliminar);

module.exports = router;
