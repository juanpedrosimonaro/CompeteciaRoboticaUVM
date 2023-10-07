const express = require('express');


// express app
const app = express();
app.set('views','./vistas');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
  res.render('index', {});
})

