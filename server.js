var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var githubcode = require('./githubapp.js');

var cors = require('cors');
var Github = require('github-api');

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(partials());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var github = new Github({
  token: githubcode.token,
  auth: 'oauth'
});

var user = github.getUser();
var url= "https://api.github.com/users/";

var handleGet = function(request, response){
  var url = request.url.toString();
  var username = url.substring(url.indexOf("?")+1);
  console.log("Should have username: ", username );

  // request(url + username).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  
  user.show(username, function(err, data) {
    if (err){ console.log(err)}
    console.dir(data.followers);

    // var followers = JSON.parse(data.followers_url);
    // var following = JSON.parse(data.following_url);
    // var friends = [];
    // var test;
    // var friendlist = app.get(data.followers_url, function(req, res){
    //    http.get(data.followers_url, function(data) {
    //       console.log("friends");
    //       console.log(data);
    //       res.json(data);
    //    });
    // });
    // for (var i = 0; i< followers.length; i++){
    //   friends.push(followers[i][login]);
    // }
    // for (var i = 0; i< following.length; i++){
    //   friends.push(followers[i][login]);
    // }
    // console.log(friends);
  });
  response.send(user);
};

app.get("/getInfo", handleGet);

app.listen(5678);