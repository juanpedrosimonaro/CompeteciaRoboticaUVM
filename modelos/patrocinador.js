const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Patrocinador extends Model{}

Patrocinador.init({
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

Patrocinador.asociarEquipo = (Equipo) =>{
  Patrocinador.belongsToMany(Equipo, { through: "Equipo_Patrocinador" });
}

module.exports = Patrocinador
