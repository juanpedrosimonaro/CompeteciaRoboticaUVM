const Modalidad = require('../modelos/modalidad');

const index = (req,res) => {
  res.render('index', {modalidades:req.session.modalidades})
}

/*
const modalidad_show = (req, res) => {
  const id = req.params.id
  res.render('modShow',{modalidad:req.session.modalidades[id]})
}
*/

const create_post = (req,res) => {
  var nombre = req.body.nombre
  const modalidad = new Modalidad(nombre);
  if (req.session.modalidades)
    req.session.modalidades.push(modalidad)
  else
    req.session.modalidades = [modalidad]
  res.status(200).json({message:"Modalidad Creada",modalidades:req.session.modalidades})
}

const create_get = (req,res) => {
  res.render('ingresarModalidad',{title:"Ingresar Modalidad"})
}

module.exports = {
  index,
  create_post,
  create_get
} 
