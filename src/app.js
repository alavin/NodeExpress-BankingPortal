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

//read the content of a accountData file
const accountData = fs.readFileSync(
    //two arguments - the absolute path to the file and the encoding
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
//to work with this data we need to convert it to a JS object
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    //two arguments - the absolute path to the file and the encoding
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);
const users = JSON.parse(userData);

//app.get needs two parameters - the path and the callback function
app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts } )); 

//rout to get savings account
app.get('/savings', (req, res) => {
    //we pass the account view and an object with the key value pair
    res.render( 'account', { account: accounts.savings } );
});

//rout to get checking account
app.get('/checking', (req, res) => {
    //we pass the account view and an object with the key value pair
    res.render( 'account', { account: accounts.checking } );
});

//rout to get credit account
app.get('/credit', (req, res) => {
    //we pass the account view and an object with the key value pair
    res.render( 'account', { account: accounts.credit } );
});

//rout to profile
app.get('/profile', (req, res) => {
    res.render( 'profile', { user: users[0] } );
});


app.listen(3000, () => console.log('PS Project Running on port 3000!'));

