const Equipo = require('../modelos/equipo');

const index = (req,res) => {
  res.render('index', {equipos:req.session.equipos});
}

const create_post = (req,res) => {
  const nombre = req.body.nombre;
  const integrantes = req.body.integrantes || []
  const catIns = req.body.catIns.map((cat)=>Number(cat))
  const equipo = new Equipo(nombre,integrantes,catIns);
  if (req.session.equipos)
    req.session.equipos.push(equipo);
  else
    req.session.equipos = [equipo];
 
  res.status(200).json({message:"Equipo Creado",equipos:req.session.equipos});
}

const create_get = (req,res) => {
  res.render('ingresarEquipo',{title:"Ingresar Equipo"});
}

const editar = (req,res) => {
  const id = req.params.id;
  if(id != undefined){
    req.session.equipos[id] = req.body;
    req.session.equipos[id].catIns = req.session.equipos[id].catIns.map((cat)=>Number(cat))
    res.status(200).json({message:"Equipo editado",equipo: req.session.equipos[id]});
  }
  else
    res.status(300).json({error:"Falta id para modificar el equipo"});

}

const eliminar = (req,res) => {
  const id = Number(req.body.equipoId);
  const eqEliminado = req.session.equipos.splice(id,1)[0];
  if (eqEliminado)
    res.status(200).json({message:"Equipo eliminado",equipo:eqEliminado})
  else
    res.status(300).json({message:"Error el equipo no pudo ser elimindo"})
}

module.exports = {
  index,
  create_post,
  create_get,
  editar,
  eliminar
} 
