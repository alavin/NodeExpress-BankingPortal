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

//use URL Encoded Middleware
app.use(express.urlencoded( { extended: true } )); 

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

//rout to get transfer
app.get('/transfer', (req, res) => {
    res.render( 'transfer', {  } );
});

//rout to post transfer
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');

    //display a confirmation message
    res.render('transfer', { message: 'Transfer Completed'});
});

//rout to get payment
app.get('/payment', (req, res) => {
    res.render( 'payment', { account: accounts.credit });
});

//rout to psot payment
app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');

    //display a confirmation message
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

//rout to profile
app.get('/profile', (req, res) => {
    res.render( 'profile', { user: users[0] } );
});


app.listen(3000, () => console.log('PS Project Running on port 3000!'));

