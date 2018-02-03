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


router.get('/list', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
			console.log(obj.city)
			var city = obj.city
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: '/restapi/v2/pois?extras%5B%5D=count&geohash=wt9nuhpydtmt&keyword='+city+'&limit=20&type=nearby',
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

//城市附近
router.get('/cityList', function(req, res, next) {
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: "/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=ww0vd0wxsj6&latitude=34.72086&limit=24&longitude=113.65168&offset=0&terminal=web",
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
   
      setTimeout(function(){
      	   res.send(str)
      },500)
    })
    myData.on("error", () =>{
      console.log("15")
    })
    myData.on("end", () => {
      console.log(1)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end(str);
});


//城市附近
router.get('/product', function(req, res, next) {
	 var options = {
    hostname: "www.ele.me",
    port: 443,
    path: "/restapi/shopping/v2/menu?restaurant_id=468660",
    methods:"GET"
	};
var str = "";
 const reqData = https.request(options, (myData) =>{
    myData.on("data", (data) => {
      str += data;
   
      setTimeout(function(){
      	   res.send(str)
      },200)
    })
    myData.on("error", () =>{
      console.log("15")
    })
    myData.on("end", () => {
      console.log(1)
    })
  })
 reqData.on("error", () => {
   console.log("22")
 })
 reqData.end(str);
});






//http://www.yiguo.com/Handler/InitLayOut?r=0.5299923408118798&_=1517455967128

router.get('/new', function(req, res, next) {
	var obj = url.parse(req.url,true).query;
			console.log(obj.city)
			var city = obj.city
	 var options = {
    hostname: "www.yiguo.com",
    port: 80,
    path: '/Handler/InitLayOut?r=0.5299923408118798&_=1517455967128',
    methods:"GET"
	};
var str = "";
 const reqData = http.request(options, (myData) =>{
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
