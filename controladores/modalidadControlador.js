const seqSync = require('../modelos/asociador');

const index = async (req,res) => {
  try{
    const { Modalidad } = await seqSync;
    const modalidades = await Modalidad.findAll();
    res.render('gestionModalidad', {modalidades,title:'Gestión de Modalidades'})
  }
  catch(error){
    console.error(error);
    res.status(300).json({ error })
  }
}

const create_post = async (req,res) => {
  const nombre = req.body.nombre
  const { Modalidad } = await seqSync;
  Modalidad.create({ nombre })
  .then((modalidad)=>res.status(200).json({ modalidad }))
  .catch((error)=>res.status(300).json({ error }))
}

const editar = async (req,res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  try{
    const { Modalidad } = await seqSync;
    const modalidad = await Modalidad.findByPk(id);
    modalidad.nombre = nombre;
    modalidad.save();
    res.status(200).json({ modalidad });
  }
  catch(error){
    console.error(error);
    res.status(300).json({ error })
  }
}

const eliminar = async(req,res) => {
  const id = req.body.id;
  try {
    const { Modalidad } = await seqSync;
    const modalidad = await Modalidad.findByPk(id);
    await modalidad.destroy();
    res.status(200).json({eliminado:true})
  }
  catch(error){
    console.error(error);
    res.status(300).json({ error })
  }

}

const create_get = (req,res) => {
  res.render('ingresarModalidad',{title:"Ingresar Modalidad"})
}

module.exports = {
  index,
  create_post,
  create_get,
  editar,
  eliminar
} 
