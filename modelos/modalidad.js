const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Modalidad extends Model{}

Modalidad.init({
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

Modalidad.asociarCategoria = (Categoria) =>{
  Modalidad.hasMany(Categoria);
}

module.exports = Modalidad
