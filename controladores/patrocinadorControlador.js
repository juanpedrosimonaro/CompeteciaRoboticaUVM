const seqSync = require('../modelos/asociador');

const index = async (req,res) => {
  const nombre = req.body.nombre;
  try{
    const { Equipo, Patrocinador } = await seqSync;
    const patrocinadores = await Patrocinador.findAll();
    res.render('gestionPatrocinadores', {patrocinadores,title:"Gestion Patrocinadores"});
  }catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const mostrar = async (req,res) => {
  const id = req.params.id;
  try{
    const { Equipo, Patrocinador } = await seqSync;
    const equipos = await Equipo.findAll();
    const patrocinador = await Patrocinador.findByPk(id,{include: Equipo});
    res.render('gestionPatrocinador', {patrocinador,equipos,title:"Gestion de Patrocinador"});
  }catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const create_post = async (req,res) => {
  const nombre = req.body.nombre;
  try{
    const { Equipo, Patrocinador } = await seqSync;
    const patrocinador = await Patrocinador.create({ nombre });
    if(req.body.equipos){
      const equipos = req.body.equipos;
      await patrocinador.setEquipos(equipos);
    }
    // if(req.body.equipoId){
    //   const equipoId = req.body.equipoId
    //   const equipo = await Equipo.findByPk(equipoId);
    //   await patrocinador.addEquipo(equipo)
    // }
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

const editar = async (req,res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  try{
    const { Patrocinador } = await seqSync;
    const patrocinador = await Patrocinador.findByPk(id);
    patrocinador.nombre = nombre;
    await patrocinador.save();
    res.status(200).json({patrocinador});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const eliminar = async (req,res) =>{
  const id = Number(req.body.id);
  try{
    const { Patrocinador } = await seqSync;
    const patrocinador = await Patrocinador.findByPk(id);
    await patrocinador.destroy();
    res.status(200).json({eliminado:true});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const patrocinarEquipo = async (req,res) =>{
  const eqId = req.body.eqId;
  const pId = req.body.pId;
  try{
    const { Patrocinador, Equipo } = await seqSync;
    const equipo = await Equipo.findByPk(eqId);
    const patrocinador = await Patrocinador.findByPk(pId);
    await patrocinador.addEquipo(equipo);
    res.status(200).json({patrocinador,equipo:(await patrocinador.getEquipos())})
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const eliminarPatrocinioEquipo = async (req,res) =>{
  const eqId = req.body.eqId;
  const pId = req.body.pId;
  try{
    const { Patrocinador, Equipo } = await seqSync;
    const equipo = await Equipo.findByPk(eqId);
    const patrocinador = await Patrocinador.findByPk(pId);
    await patrocinador.removeEquipo(equipo);
    res.status(200).json({eliminado:true})
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
  mostrarPorEquipo,
  editar,
  eliminar,
  mostrar,
  patrocinarEquipo,
  eliminarPatrocinioEquipo
} 
