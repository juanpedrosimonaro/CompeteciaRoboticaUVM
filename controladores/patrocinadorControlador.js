const seqSync = require('../modelos/asociador');

const index = (req,res) => {
  res.render('index', {patrocinadores:req.session.patrocinadores});
}

const create_post = async (req,res) => {
  const nombre = req.body.nombre;
  const equipos = req.body.equipos || [];
  try{
    const { Equipo, Patrocinador } = await seqSync;
    const patrocinador = await Patrocinador.create({ nombre });
    await patrocinador.setEquipos(equipos);
    res.status(200).json({patrocinador,equipos:(await patrocinador.getEquipos())});
  }catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const create_get = (req,res) => {
  res.render('ingresarPatrocinador',{title:"Ingresar Patrocinador"});
}

const mostrarTodos = async (req,res) =>{
  try{
    const { Patrocinador } = await seqSync;
    const patrocinadores = await Patrocinador.findAll();
    res.status(200).json({ patrocinadores });
  }catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const mostrarPorEquipo = async (req,res) =>{
  try{
    const { Equipo, Patrocinador } = await seqSync;
    const equipos = await Equipo.findAll({ include: Patrocinador });
    res.status(200).json({equipos});
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
  mostrarTodos,
  mostrarPorEquipo
} 
