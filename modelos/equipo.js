const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Equipo extends Model{}

Equipo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{ sequelize });

Equipo.asociarCategoria = (Categoria) =>{
  Equipo.belongsTo(Categoria);
}

Equipo.asociarPatrocinador = (Patrocinador) =>{
  Equipo.belongsToMany(Patrocinador, { through: "Equipo_Patrocinador" } );
}

Equipo.asociarIntegrante = (Integrante) =>{
  Equipo.hasMany(Integrante)
}

module.exports = Equipo;
