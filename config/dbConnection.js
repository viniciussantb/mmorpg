const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
    
module.exports = client;
