const seqSync = require('../modelos/asociador');

const index = async (req,res) => {
  try{
    const { Equipo } = await seqSync;
    const equipos = await Equipo.findAll();
    res.render('gestionEquipos',{equipos,title:"Gestion de Equipos"})
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }

}

const create_post = async (req,res) => {
  const nombre = req.body.nombre;
  try{
    const { Equipo, Integrante, Categoria } = await seqSync;
    const equipo = await Equipo.create({ nombre });
    var categorias = [];
    var integrantesMod = []; 
    if(req.body.catIns){
      const catIns = req.body.catIns.map((cat)=>Number(cat));
      categorias = await Categoria.findAll({where:{ id: catIns }});
      await equipo.setCategoria(categorias);
    }
    if(req.body.integrantes){
      const integrantes = req.body.integrantes;
      const integranteEq = integrantes.map((inte) => Object.assign({},inte,{EquipoId:equipo.id}))
      integrantesMod = await Integrante.bulkCreate(integranteEq,{ updateOnDuplicate:["nombre"] })
    }
    res.status(200).json({equipo,integrantes:integrantesMod,catIns:categorias.map((cat)=>cat.id)});

  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const create_get = (req,res) => {
  res.render('ingresarEquipo',{title:"Ingresar Equipo"});
}

const editar = async(req,res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  // const integrantes = req.body.integrantes;
  // const catIns = req.body.catIns.map((cat)=>Number(cat));
  try{
    const { Equipo, Integrante, Categoria } = await seqSync;
    const equipo = await Equipo.findByPk(id);
    equipo.nombre = nombre;
    equipo.save();
    if(req.body.catIns){
      const catIns = req.body.catIns.map((cat)=>Number(cat));
      const categorias = await Categoria.findAll({where:{ id: catIns }});
      await equipo.setCategoria(categorias);
    }
    if(req.body.integrantes){
      const integrantes = req.body.integrantes;
      const integranteEq = integrantes.map((inte) => Object.assign({},inte,{EquipoId:equipo.id}))
      const integrantesMod = await Integrante.bulkCreate(integranteEq,{ updateOnDuplicate:["nombre"] })
      await equipo.setIntegrantes(integrantesMod)
    }
    res.status(200).json({equipo,integrantes:(await equipo.getIntegrantes()),catIns:(await equipo.getCategoria()).map((cat)=>cat.id)});

  }catch(error){
    console.error(error);
    res.status(300).json(error);
  }

}

const eliminar = async (req,res) => {
  const id = Number(req.body.equipoId);
  try{
    const { Equipo } = await seqSync;
    const equipo = await Equipo.findByPk(id);
    await equipo.destroy();
    res.status(200).json({eliminado:true});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }

}

const mostrar = async(req,res) => {
  const id = Number(req.params.id)
  try{
    const { Equipo, Integrante, Categoria } = await seqSync;
    const categorias = await Categoria.findAll()
    const equipo = await Equipo.findByPk(id,{include:[Integrante, Categoria]});
    if(equipo)
    res.render('gestionEquipo',{equipo,categorias,title:("Gestion de Equipo")});
    else throw new Error("Equipo no encontrado")
  }
  catch(error){
    console.error(error);
    res.status(300).json(error)
  }
}

const mostrarTodos = async (req,res) =>{
  try{
    const { Equipo } = await seqSync;
    const equipos = await Equipo.findAll();
    res.status(200).json({equipos});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }

}


const mostrarPorCategoria = async (req,res) => {
  try{
    const { Categoria, Equipo } = await seqSync;
    const categorias = await Categoria.findAll({include: Equipo})
    console.log(await categorias[0].Equipos[0],await categorias[1].Equipos[0]);
    res.status(200).json({categorias});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const agregarIntegranteEquipo = async(req,res) =>{
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const equipoId = Number(req.body.equipoId);
  try{
    const { Integrante, Equipo } = await seqSync;
    const integrante = await Integrante.create({cedula,nombre});
    const equipo = await Equipo.findByPk(equipoId);
    const integranteEq = await equipo.addIntegrante(integrante);
    res.status(200).json({integrante:integranteEq});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const editarIntegranteEquipo = async(req,res) =>{
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const equipoId = Number(req.body.equipoId);
  try{
    const { Integrante, Equipo } = await seqSync;
    const integrante = await Integrante.findByPk(cedula);
    // const equipo = await Equipo.findByPk(equipoId);
    integrante.nombre = nombre;
    await integrante.save();
    res.status(200).json({integrante});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const agregarCategoriaEquipo = async (req,res) => {
  const id = Number(req.body.categoriaId);
  const nombre = req.body.nombre;
  const equipoId = Number(req.body.equipoId);
  try{
    const { Categoria, Equipo } = await seqSync;
    const categoria = await Categoria.findByPk(id)
    const equipo = await Equipo.findByPk(equipoId);
    await equipo.addCategoria(categoria)
    res.status(200).json({categoria,equipo});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const eliminarCategoriaDeEquipo = async (req,res) => {
  const eqId = Number(req.body.eqId);
  const catId = Number(req.body.catId);
  try{
    const { Categoria, Equipo } = await seqSync;
    const equipo = await Equipo.findByPk(eqId);
    const categoria = await Categoria.findByPk(catId);
    await equipo.removeCategoria(categoria);
    res.status(200).json({eliminado:true});
  }
  catch(error){
    console.error(error);
    res.status(300).json(error);
  }
}

const eliminarIntegranteEquipo = async (req,res) => {
  const cedula = req.body.cedula;
  const equipoId = Number(req.body.equipoId);
  try{
    const { Integrante, Equipo } = await seqSync;
    const integrante = await Integrante.findByPk(cedula);
    const equipo = await Equipo.findByPk(equipoId);
    await equipo.removeIntegrante(integrante);
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
  eliminar,
  mostrar,
  mostrarTodos,
  mostrarPorCategoria,
  eliminarCategoriaDeEquipo,
  eliminarIntegranteEquipo,
  agregarIntegranteEquipo,
  editarIntegranteEquipo,
  agregarCategoriaEquipo
} 
