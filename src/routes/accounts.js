const express = require('express');

const router = express.Router();

const { accounts } = require('../data');

//rout to get savings account
router.get('/savings', (req, res) => {
    //we pass the account view and an object with the key value pair
    res.render( 'account', { account: accounts.savings } );
});

//rout to get checking account
router.get('/checking', (req, res) => {
    //we pass the account view and an object with the key value pair
    res.render( 'account', { account: accounts.checking } );
});

//rout to get credit account
router.get('/credit', (req, res) => {
    //we pass the account view and an object with the key value pair
    res.render( 'account', { account: accounts.credit } );
});

module.exports = router;