const express = require('express');
const patrocinadorControlador = require('../controladores/patrocinadorControlador');

const router = express.Router();

router.get('/ingresar-patrocinador',patrocinadorControlador.create_get);
router.get('/patrocinadores',patrocinadorControlador.mostrarTodos);
router.get('/gestion-patrocinadores',patrocinadorControlador.index);
router.get('/gestionar-patrocinador/:id',patrocinadorControlador.mostrar);
router.post('/ingresar-patrocinador',patrocinadorControlador.create_post);
router.get('/patrocinadoresPorEquipo',patrocinadorControlador.mostrarPorEquipo);
router.put('/editar-patrocinador/:id',patrocinadorControlador.editar);
router.delete('/eliminar-patrocinador/',patrocinadorControlador.eliminar);
router.post('/patrocinar-equipo',patrocinadorControlador.patrocinarEquipo);
router.delete('/eliminar-patrocinio',patrocinadorControlador.eliminarPatrocinioEquipo)
router.get('/pratrocinadoresPorEquipo',patrocinadorControlador.mostrarPorEquipo)

module.exports = router;
