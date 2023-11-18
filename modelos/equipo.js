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
  Equipo.belongsToMany(Categoria, { through: "Categoria_Equipo", onDelete:'cascade'/*, as:{singular:'categoria',plural:'categorias'}*/ } );
}

Equipo.asociarPatrocinador = (Patrocinador) =>{
  Equipo.belongsToMany(Patrocinador, { through: "Equipo_Patrocinador", onDelete:'cascade',  } );
}

Equipo.asociarIntegrante = (Integrante) =>{
  Equipo.hasMany(Integrante,{onDelete:'cascade'})
}

module.exports = Equipo;
