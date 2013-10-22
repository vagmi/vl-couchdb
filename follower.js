var follow = require('follow');
var request= require('request');
var dbURL = "http://localhost:5984/bhojanam";
follow({db: dbURL,include_docs: true},function(err,change){
  console.log("Change received: ");
  console.log(change);
});

var putObject = function(options) {
  request({
    uri: dbURL,
    method: 'post',
    json: options
  },function(err, response,body){
  })
}
setInterval(function(){
  var rnd = parseInt(10*Math.random());
  putObject({type:"Interval Object", name: "Random Interval " + rnd });
},500);
