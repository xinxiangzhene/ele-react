var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var querystring = require('querystring')
var MySql = require('./../md/MySql.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('ele');
});

router.post('/proList', (req, res, next) => {
	var obj = req.body;
		MySql.mongoConnect('ele', (db) => {
			console.log('连接服务器成功');
					MySql.insertOneData(db, 'proList', obj, (result) => {
						console.log('下单成功')
						res.send('1');
						db.close();
		})


			})
})

router.get('/findList', (req, res, next) => {
	var obj = url.parse(req.url, true).query;
		console.log(obj)
		MySql.mongoConnect('ele', (db) => {
			console.log('连接服务器成功');
					MySql.findData(db, 'proList',{},{},(result) => {
						console.log('下单成功')
						res.send(result);
						db.close();
		})
			})
})
module.exports = router;
