var request = require('request');
var fs=require('fs');

var restaurants = [];
var dbName = "bhojanam";
var dbURL = function() {
  return "http://localhost:5984/"+dbName+"/";
}
var createRestaurant = function(options) {
  request({
    uri: dbURL(),
    method: 'post',
    json: options
  },function(err, response,body){
    console.log("Created restaurant ... ")
    console.log(body);
  })
}

var createCuisineCountView = function() {
  var mapFn=fs.readFileSync("couch_views/cuisine_count/map.js",{encoding: "utf-8"});
  var reduceFn=fs.readFileSync("couch_views/cuisine_count/reduce.js",{encoding: "utf-8"});
  var revNo = "";
  request({
    uri: dbURL()+"_design/bhojanamdesign",
    method: 'get'
  },function(err,resp,body) {
    revNo=JSON.parse(body)._rev;
    request({
      uri: dbURL(),
      method: 'post',
      json: {
        "_id": "_design/bhojanamdesign",
        "_rev": revNo,
        views: {
          cuisineCount42: {
            map: mapFn,
            reduce: reduceFn
          }
        }
      }
    },function(err,resp,body){
      console.log(body);
    });
  });
}
var seedRestaurants = function() {
  var cuisines = ["continental","chinese","south indian","north indian","mughalai","thai"]
  for(i=0;i<100;i++) {
    var currentCuisines = []
    currentCuisines.push(cuisines[parseInt(cuisines.length*Math.random())]);
    currentCuisines.push(cuisines[parseInt(cuisines.length*Math.random())]);
    currentCuisines.push(cuisines[parseInt(cuisines.length*Math.random())]);
    createRestaurant({
      type: "restaurant",
      name: "Restaurant " + i,
      cuisines: currentCuisines
    });
  }
}
//seedRestaurants();
createCuisineCountView();
