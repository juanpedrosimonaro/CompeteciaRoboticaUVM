const Categoria = require('../modelos/categoria');

const index = (req,res) => {
  res.render('index', {categorias:req.session.modalidades});
}

const create_post = (req,res) => {
  const modalidadId = Number(req.body.modalidadId);
  const nombre = req.body.nombre;
  const categoria = new Categoria(modalidadId, nombre);
  if (req.session.categorias)
    req.session.categorias.push(categoria);
  else
    req.session.categorias = [categoria];
  res.status(200).json({message:"Categoria Creada",categorias:req.session.categorias});
}

const create_get = (req,res) => {
  res.render('ingresarCategoria',{title:"Ingresar Categoria"});
}

const editar = (req,res) => {
  const id = req.params.id;
  if(id != undefined){
    req.session.categorias[id] = req.body;
    req.session.categorias[id].modalidadId = Number(req.session.categorias[id].modalidadId);
    res.status(200).json({message:"Categoria editada",categoria: req.session.categorias[id]});
  }
  else
    res.status(300).json({error:"Falta id para modificar categoria"});

}

const eliminar = (req,res) => {
  const id = Number(req.body.categoriaId);
  const catEliminado = req.session.categorias.splice(id,1)[0];
  if (catEliminado)
    res.status(200).json({message:"Categoria eliminada",categoria:catEliminado})
  else
    res.status(300).json({message:"Error la categoria no pudo ser eliminda"})
}

module.exports = {
  index,
  create_post,
  create_get,
  editar,
  eliminar
} 
