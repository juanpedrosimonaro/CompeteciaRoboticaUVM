const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Usuario extends Model{}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  contrasena: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('Administrador','Editor'),
    allowNull: false
  }
},{ sequelize });


module.exports = Usuario
