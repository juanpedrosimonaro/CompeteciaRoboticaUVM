const Modalidad = require("./modalidad");
const Categoria = require("./categoria");
const Equipo = require("./equipo");
const Patrocinador = require("./patrocinador");
const Integrante = require("./integrante");

const sequelize = require("../db")

Modalidad.asociarCategoria(Categoria);

Categoria.asociarModalidad(Modalidad);
Categoria.asociarEquipo(Equipo);

Equipo.asociarCategoria(Categoria);
Equipo.asociarPatrocinador(Patrocinador);
Equipo.asociarIntegrante(Integrante);

Patrocinador.asociarEquipo(Equipo);

Integrante.asociarEquipo(Equipo);

module.exports = sequelize.sync().then(()=>
({
    Modalidad,
    Categoria,
    Equipo,
    Patrocinador,
    Integrante
})
);