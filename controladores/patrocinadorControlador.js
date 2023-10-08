const Patrocinador = require('../modelos/patrocinador');

const index = (req,res) => {
  res.render('index', {patrocinadores:req.session.patrocinadores});
}

const create_post = (req,res) => {
  const nombre = req.body.nombre;
  const patrocinador = new Patrocinador(nombre);
  if (req.session.patrocinadores)
    req.session.patrocinadores.push(patrocinador);
  else
    req.session.patrocinadores = [patrocinador];
  res.status(200).json({message:"Patrocinador Creado",patrocinadores:req.session.patrocinadores});
  res.render('ingresarPatrocinador',{title:"Ingresar Patrocinador"});
}

const create_get = (req,res) => {
  res.render('ingresarPatrocinador',{title:"Ingresar Patrocinador"});
}

const mostrarTodos = (req,res) =>{
  res.status(200).json({patrocinadores:req.session.patrocinadores});
}

module.exports = {
  index,
  create_post,
  create_get,
  mostrarTodos
} 
