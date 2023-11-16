const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Categoria extends Model{}

Categoria.init({
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

Categoria.asociarModalidad = (Modalidad) =>{
  Categoria.belongsTo(Modalidad);
}

Categoria.asociarEquipo = (Equipo) =>{
  Categoria.belongsToMany(Equipo, { through: "Categoria_Equipo" } );
}

module.exports = Categoria
