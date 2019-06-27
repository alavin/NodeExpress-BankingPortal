const fs = require('fs');
const path = require('path');

const express = require('express');

const { accounts, users, writeJSON } = require('./data'); 
const accountRoutes = require('./routes/accounts'); 
const servicesRoutes = require('./routes/services'); 

const app = express();

//set view path
app.set('views', path.join(__dirname, 'views')); 
//set view engine is ejs
app.set('view engine', 'ejs');  

//point to the public dir where all css and js are
app.use(express.static(path.join(__dirname, 'public'))); 

//use URL Encoded Middleware
app.use(express.urlencoded( { extended: true } )); 

//app.get needs two parameters - the path and the callback function
app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts } )); 

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

//rout to profile
app.get('/profile', (req, res) => {
    res.render( 'profile', { user: users[0] } );
});


app.listen(3000, () => console.log('PS Project Running on port 3000!'));

