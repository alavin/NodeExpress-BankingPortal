const fs = require('fs');
const path = require('path');

//read the content of a accountData file
const accountData = fs.readFileSync(
    //two arguments - the absolute path to the file and the encoding
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
//to work with this data we need to convert it to a JS object
const accounts = JSON.parse(accountData);

//read the content of a userData file
const userData = fs.readFileSync(
    //two arguments - the absolute path to the file and the encoding
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);
const users = JSON.parse(userData);

const writeJSON = () => {
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8');
};

module.exports = { accounts, users, writeJSON };