var express = require('express');
var router = express.Router();
var url = require('url');
const mongodb=require('mongodb').MongoClient;
const db_str="mongodb://localhost:27017/elelogon";
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//查询地址：
router.get('/AddList',function(req,res){
	var obj= url.parse(req.url,true).query;
			console.log(obj)
	 mongodb.connect(db_str,(err,db) => {
      console.log("数据库链接成功")
    				db.collection('user').find({user:obj.user},{}).toArray((err,result)=>{
			     				res.send(result)
			       			db.close()
       	})
    })
})

router.post("/addAddress",(req,res)=>{
	var obj= req.body
	console.log(obj)
	 mongodb.connect(db_str,(err,db) => {
      console.log("数据库链接成功")
				db.collection('user').update({user:obj.user},{$set:{Add_List:obj.Add_List}},true,(err,result)=>{
       			console.log('添加成功')
	     			res.send('1')
       			db.close()
       	})
})
})

module.exports = router;
