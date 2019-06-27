const express = require('express');

const router = express.Router();

const { accounts, writeJSON } = require('../data');

//rout to get transfer
router.get('/transfer', (req, res) => {
    res.render( 'transfer', {  } );
});

//rout to post transfer
router.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
    writeJSON();

    //display a confirmation message
    res.render('transfer', { message: 'Transfer Completed'});
});

//rout to get payment
router.get('/payment', (req, res) => {
    res.render( 'payment', { account: accounts.credit });
});

//rout to psot payment
router.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    writeJSON();

    //display a confirmation message
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;