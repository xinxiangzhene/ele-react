var express = require('express');
var router = express.Router();
var https = require('https');
var http = require('http');

const mongodb=require('mongodb').MongoClient;
const db_str="mongodb://localhost:27017/elelogon";
var url = require('url');

//短信
//var SendCode=require("../sendCode.js");

//手机短信四位随机数
function getNum(){
	return Math.floor(Math.random() * 9000 + 1000);
}
var sendCd = '';

//点击获取短信验证码
//router.get('/yanzheng',(req,res)=>{
//		//获取手机号
//		var obj = url.parse(req.url,true).query;
//		//四位随机数字
//		sendCd = getNum();
//		//手机号
//		var mobile =obj.user;
//		//调用短信
////		SendCode.aliyun(mobile,'张向东','SMS_123665421',sendCd,(data)=>{
////			console.log('发送短信成功')
////		})
//})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  console.log(req.query)
  res.send('1')
});
router.get("/newlogon",(req,res)=>{
	var obj = url.parse(req.url,true).query;
	var code=obj.code;
	if(code==sendCd){
	mongodb.connect(db_str,(err,sjk)=>{
		sjk.collection("logon",(err,coll)=>{
			coll.find({user:obj.user}).toArray((err,result)=>{
				
				if(result.length>0){
					res.send('0')
				}else{
					coll.insertOne(obj.user,(err,result)=>{
							res.send('1')
					})
				}
				sjk.close()
			})
		})
	})
	}else{
		res.send('2')
	}
})

//密码登录
router.get("/denglu",(req,res)=>{
	var str= url.parse(req.url,true).query;
	console.log(str)
	mongodb.connect(db_str,(err,sjk)=>{
		sjk.collection("logon",(err,coll)=>{
			coll.find({user:str.user,code:str.pass}).toArray((err,result)=>{
				
				if(result.length>0){
					res.send('0')
				}else{
					coll.insertOne(str,(err,result)=>{
							res.send('1')
					})
				}
				sjk.close()
			})
		})
	})
})

//根据经纬度获取geohash信息
router.get('/geohash', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/bgs/poi/reverse_geo_coding?latitude='+obj.latitude+'&longitude='+obj.longitude+'',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();
});


//选择城市
router.get('/city', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
			console.log(obj.city)
			var city = obj.city
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/shopping/v1/cities',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();

});

//搜索城市具体地区
var querystring = require('querystring')
router.get('/list', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
	var city = querystring.escape(obj.city)
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/v2/pois?extras%5B%5D=count&geohash='+obj.geohash+'&keyword='+city+'&limit=20&type=nearby',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();

});

//附近商店列表
router.get('/shopList', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
				console.log(obj.page)
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: "/restapi/shopping/restaurants?extras%5B%5D=activities&geohash="+obj.geohash+"&latitude="+obj.latitude+"&limit=24&longitude="+obj.longitude+"&offset="+obj.page+"&terminal=web",
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("15")
    })
    myData.on("end", () => {
    	 res.send(str)
      console.log(1)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end(str);
});


//店铺详情
router.get('/shopDetail', function(req, res, next) {
	obj = url.parse(req.url,true).query;
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: "/restapi/shopping/v2/menu?restaurant_id="+obj.id+"",
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("15")
    })
    myData.on("end", () => {
    	 res.send(str)
      console.log(1)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();
});

//商店详情信息
router.get('/shopDetail1', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/shopping/restaurant/'+obj.id+'',
    methods:"GET"
	};
var str = "";
   const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("15")
    })
    myData.on("end", () => {
    	 res.send(str)
      console.log(1)
    })
})
   reqData.on("error", () => {
   console.log("22")
   })
   reqData.end(str);
});



//美食分类菜单
router.get('/foodKind', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
		
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/shopping/v2/restaurant/category?latitude='+obj.latitude+'&longitude='+obj.longitude+'',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();
});
//美食分类详情
router.get('/foodList', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
		console.log(obj)
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/shopping/restaurants?extras%5B%5D=activities&geohash='+obj.geohash+'&latitude='+obj.latitude+'&limit=24&longitude='+obj.longitude+'&offset='+obj.page+'&restaurant_category_ids%5B%5D='+obj.id+'&sign='+obj.sign+'&terminal=web',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();
});

//www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=ww0vd0wxzdds&latitude=34.720888&limit=24&longitude=113.65183&offset=0&restaurant_category_ids%5B%5D=2&sign=1517740720561&terminal=web
//美食二级分类详情
router.get('/twoKind', function(req, res, next) {
	var obj = url.parse(req.url,true).query;

	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/shopping/restaurants?extras%5B%5D=activities&geohash='+obj.geohash+'&latitude='+obj.latitude+'&limit=24&longitude='+obj.longitude+'&offset='+obj.page+'&restaurant_category_ids%5B%5D='+obj.id+'&sign='+obj.time+'&terminal=web',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();
});

//获取满减数据
router.get('/CartList', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/shopping/restaurant/'+obj.id+'?extras%5B%5D=activities&extras%5B%5D=license&extras%5B%5D=identification&extras%5B%5D=albums&extras%5B%5D=flavors&latitude='+obj.latitude+'&longitude='+obj.longitude+'',
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
    })
    myData.on("error", () =>{
      console.log("1")
    })
    myData.on("end", () => {
      res.send(str)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end();
});
module.exports = router;
