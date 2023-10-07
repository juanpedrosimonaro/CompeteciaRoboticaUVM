const express = require('express');
const session = require('express-session');
const modalidadRutas = require('./rutas/modalidadRutas')
const categoriaRutas = require('./rutas/categoriaRutas')

// express app
const app = express();
app.set('views','./vistas');
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'millavesecreta',
  resave: false,
  saveUnitialized: true
}));

// rutas
app.get('/', (req,res)=>{
  res.render('index', {});
})
app.use('/modalidades',modalidadRutas);
app.use('/categorias',categoriaRutas);

const server = app.listen(3000,()=>{
  console.log('Servidor iniciado en el puerto 3000')
})

module.exports = server;
