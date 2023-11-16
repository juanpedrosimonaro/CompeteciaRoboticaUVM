const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Integrante extends Model{}

Integrante.init({
  cedula: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{ sequelize });

Integrante.asociarEquipo = (Equipo) =>{
  Integrante.belongsTo(Equipo);
}

module.exports = Integrante
