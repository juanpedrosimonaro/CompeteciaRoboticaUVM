const seqSync = require('../modelos/asociador');

const index = (req,res) => {
  res.render('index', {categorias:req.session.categorias});
}

const create_post = async (req,res) => {
  const modalidadId = Number(req.body.modalidadId);
  const nombre = req.body.nombre;

  try{
    const { Modalidad, Categoria } = await seqSync;
    const modalidad = await Modalidad.findByPk(modalidadId);
    const categoria = Categoria.build({ nombre });
    categoria.setModalidad(modalidad,{save:false});
    await categoria.save();
    res.status(200).json({categoria});
  }
  catch(error){
    console.error(error)
    res.status(300).json(error);
  }
}

const create_get = (req,res) => {
  res.render('ingresarCategoria',{title:"Ingresar Categoria"});
}

const editar = async (req,res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const modalidadId = req.body.modalidadId;
  try{
    const { Modalidad, Categoria } = await seqSync;
    const categoria = await Categoria.findByPk(id);
    const modalidad = await Modalidad.findByPk(modalidadId);
    categoria.nombre = nombre;
    categoria.setModalidad(modalidad,{save:false});
    await categoria.save();
    res.status(200).json({categoria});
  }
  catch(error){
    res.status(300).json(error);
  }

}

const eliminar = async (req,res) => {
  const id = Number(req.body.categoriaId);
  try{
    const { Categoria } = await seqSync;
    const categoria = await Categoria.findByPk(id);
    await categoria.destroy();
    res.status(200).json({eliminado:true});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }

}

module.exports = {
  index,
  create_post,
  create_get,
  editar,
  eliminar
} 
