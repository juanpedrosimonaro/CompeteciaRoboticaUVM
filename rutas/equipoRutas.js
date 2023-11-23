const express = require('express');
const equipoControlador = require('../controladores/equipoControlador');

const router = express.Router();

router.get('/ingresar-equipo',equipoControlador.create_get);
router.get('/gestion-equipos',equipoControlador.index);
router.get('/gestionar-equipo/:id',equipoControlador.mostrar);
router.post('/ingresar-equipo',equipoControlador.create_post);
router.put('/editar-equipo/:id',equipoControlador.editar);
router.delete('/eliminar-equipo/',equipoControlador.eliminar);
router.get('/equipos',equipoControlador.mostrarTodos);
router.get('/equiposPorCategoria',equipoControlador.mostrarPorCategoria);
router.delete('/eliminar-categoria',equipoControlador.eliminarCategoriaDeEquipo)
router.delete('/eliminar-integrante-equipo',equipoControlador.eliminarIntegranteEquipo)
router.post('/ingresar-integrante',equipoControlador.agregarIntegranteEquipo)  
router.put('/editar-integrante',equipoControlador.editarIntegranteEquipo)  
router.post('/ingresar-categoria',equipoControlador.agregarCategoriaEquipo)  

module.exports = router;
