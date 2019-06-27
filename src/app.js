const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const { accounts, users, writeJSON } = require('./data'); 

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
    writeJSON();

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
    writeJSON();

    //display a confirmation message
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

//rout to profile
app.get('/profile', (req, res) => {
    res.render( 'profile', { user: users[0] } );
});


app.listen(3000, () => console.log('PS Project Running on port 3000!'));

