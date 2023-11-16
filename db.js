require("dotenv").config()
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASENAME,process.env.DBUSERNAME,process.env.DBPASSWORD,{
  host: process.env.DBHOST,
  dialect: process.env.DBDIALECT
});
// (async ()=>{
//   try {
//     await sequelize.authenticate();
//     console.log("OK!");
//   } catch (error) {
//     console.error("Something went wrong!!",error);
//   }
// })()

module.exports = sequelize;
