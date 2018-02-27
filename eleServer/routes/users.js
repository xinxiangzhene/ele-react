var express = require('express');
var router = express.Router();
var url = require('url');
const mongodb=require('mongodb').MongoClient;
const db_str="mongodb://localhost:27017/elelogon";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
