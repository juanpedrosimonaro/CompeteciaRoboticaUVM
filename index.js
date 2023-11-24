const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const modalidadRutas = require('./rutas/modalidadRutas')
const categoriaRutas = require('./rutas/categoriaRutas')
const equipoRutas = require('./rutas/equipoRutas')
const patrocinadorRutas = require('./rutas/patrocinadorRutas')
const authRutas = require('./rutas/authRutas')

// express app
const app = express();
app.set('views','./vistas');
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const verificarToken = (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }
  jwt.verify(token, 'clave_ultrasecreta', (err, decoded) => {
    if (err) {
      console.log
      return res.redirect('/auth/login');
    }
    req.usuario = decoded.usuario;
    next();
  });
}

const verificarAdministrador = (req, res, next) => {
  if(req.usuario && req.usuario.rol == "Administrador"){
    next()
  }else{
    return res.status(403).send('Acceso denegado');
  }
}


// rutas
app.get('/',verificarToken, (req,res)=>{
  res.render('index', {title:"Pagina Principal"});
})

app.use('/modalidades',verificarToken, verificarAdministrador, modalidadRutas);
app.use('/categorias',verificarToken, verificarAdministrador, categoriaRutas);
app.use('/equipos',verificarToken, equipoRutas);
app.use('/patrocinadores',verificarToken, patrocinadorRutas);
app.use('/auth',authRutas);

const server = app.listen(3000,()=>{
  console.log('Servidor iniciado en el puerto 3000')
})

module.exports = server;
