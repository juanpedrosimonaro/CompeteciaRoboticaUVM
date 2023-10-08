const express = require('express');
const equipoControlador = require('../controladores/equipoControlador');

const router = express.Router();

router.get('/ingresar-equipo',equipoControlador.create_get);
router.post('/ingresar-equipo',equipoControlador.create_post);
router.put('/editar-equipo/:id',equipoControlador.editar);
router.delete('/eliminar-equipo/',equipoControlador.eliminar);

module.exports = router;
