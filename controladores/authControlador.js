const seqSync = require('../modelos/asociador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mostrarLogin = (req,res) => {
  res.render('login',{title:"Inicio de Sesion"})
}

const loguearUsuario = async (req,res) => {
  const nombre = req.body.nombre;
  const contrasena = req.body.contrasena;
  try{
    const { Usuario } = await seqSync;
    const usuario = await Usuario.findOne({where:{nombre}})
    bcrypt.compare(contrasena, usuario.contrasena, (err,result)=>{
      if(result){
        console.log("Contraseña correcta");
        jwt.sign({usuario}, 'clave_ultrasecreta', (err, token) => {
          if (err) {
            res.sendStatus(500);
          } else {
            console.log("Usuario iniciado");
            res.cookie('token', token, { httpOnly: true });
            res.render('index',{title:"Pagina principal"})
          }
        })
      }
      else console.log("Contraseña es incorrecta")
    })
  }catch(error){
    console.error(error);
    res.status(300).json({error})
  }
}

const mostrarRegistro = (req,res) => {
  res.render('registro',{title:"Inicio de Sesion"})
}

const registrarUsuario = async (req,res) => {
  const nombre = req.body.nombre;
  const contrasena = req.body.contrasena;
  const rol = req.body.rol;
  try{
    const { Usuario } = await seqSync;
    bcrypt.hash(contrasena,10,async(err,hash)=>{
      if(!err){
        const usuario = await Usuario.create({nombre,rol,contrasena:hash});
        jwt.sign({usuario}, 'clave_ultrasecreta', (err, token) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.cookie('token', token, { httpOnly: true });
            res.render('index',{title:"Pagina principal"})
          }
        })
      }
    })
  } catch(error){
    console.error(error)
    res.status(300).json(error)
  }

}

const cerrarSesion = (req,res) =>{
  res.clearCookie('token');
  res.redirect('/auth/login');
}

module.exports = {
  mostrarLogin,
  loguearUsuario,
  mostrarRegistro,
  registrarUsuario,
  cerrarSesion
} 
