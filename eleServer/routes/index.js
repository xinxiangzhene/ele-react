var express = require('express');
var router = express.Router();
var https = require('https');
var http = require('http');
var url = require('url');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
router.get('/list', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/v2/pois?extras%5B%5D=count&geohash='+obj.geohash+'&keyword='+obj.city+'&limit=20&type=nearby',
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
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: "/restapi/shopping/restaurants?extras%5B%5D=activities&geohash="+obj.geohash+"&latitude="+obj.latitude+"&limit=24&longitude="+obj.longitude+"&offset=0&terminal=web",
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




//根据经纬度获取geohash信息
router.get('/geohash', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
		console.log(obj)
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
module.exports = router;
