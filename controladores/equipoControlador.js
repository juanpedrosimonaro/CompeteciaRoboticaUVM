const seqSync = require('../modelos/asociador');

const index = (req,res) => {
  res.render('index', {equipos:req.session.equipos});
}

const create_post = async (req,res) => {
  const nombre = req.body.nombre;
  const integrantes = req.body.integrantes || [];
  const catIns = req.body.catIns.map((cat)=>Number(cat));
  try{
    const { Equipo, Integrante, Categoria } = await seqSync;
    const equipo = await Equipo.create({ nombre })
    const categorias = await Categoria.findAll({where:{ id: catIns }});
    await equipo.setCategoria(categorias);
    const integranteEq = integrantes.map((inte) => Object.assign({},inte,{EquipoId:equipo.id}))
    const integrantesMod = await Integrante.bulkCreate(integranteEq,{ updateOnDuplicate:["nombre"] })
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
  const integrantes = req.body.integrantes || [];
  const catIns = req.body.catIns.map((cat)=>Number(cat));
  try{
    const { Equipo, Integrante, Categoria } = await seqSync;
    const equipo = await Equipo.findByPk(id);
    const categorias = await Categoria.findAll({where:{ id: catIns }});
    equipo.nombre = nombre;
    await equipo.setCategoria(categorias);
    const integranteEq = integrantes.map((inte) => Object.assign({},inte,{EquipoId:equipo.id}))
    const integrantesMod = await Integrante.bulkCreate(integranteEq,{ updateOnDuplicate:["nombre"] })
    await equipo.setIntegrantes(integrantesMod)
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

module.exports = {
  index,
  create_post,
  create_get,
  editar,
  eliminar,
  mostrarTodos,
  mostrarPorCategoria,
  eliminarCategoriaDeEquipo
} 
