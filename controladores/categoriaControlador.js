const Categoria = require('../modelos/categoria');

const index = (req,res) => {
  res.render('index', {categorias:req.session.modalidades})
}

const create_post = (req,res) => {
  const modalidadId = req.body.modalidadId
  const nombre = req.body.nombre
  const categoria = new Categoria(nombre);
  if (req.session.categorias)
    req.session.categorias.push(categoria)
  else
    req.session.categorias = [categoria]
  res.status(200).json({message:"Categoria Creada",categorias:req.session.categorias})
}

const create_get = (req,res) => {
  res.render('ingresarCategoria',{title:"Ingresar Categoria"})
}

module.exports = {
  index,
  create_post,
  create_get
} 
