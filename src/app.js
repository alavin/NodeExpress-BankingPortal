const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

//set view path
app.set('views', path.join(__dirname, 'views')); 
//set view engine is ejs
app.set('view engine', 'ejs');  

//point to the public dir where all css and js are
app.use(express.static(path.join(__dirname, 'public'))); 

//app.get needs two parameters - the path and the callback function
app.get('/', (req, res) => res.render('index', { title: 'Index' } )); 

app.listen(3000, () => console.log('PS Project Running on port 3000!'));

