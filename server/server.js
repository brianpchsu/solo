var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var githubcode = require('./githubapp.js');
var cors = require('cors');
var Github = require('github-api');
var initialize = require("./initialize.js");
var helper = require("./helpers.js");
var jsdom = require("jsdom").jsdom;

initialize();

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(partials());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

var github = new Github({
  token: githubcode.token,
  auth: 'oauth'
});

var user = github.getUser();
var url= "https://api.github.com/users/";

var handleGet = function(request, response){
  var url = request.url.toString();
  console.log("url ", url);
  //Get target username
  var username = url.substring(url.indexOf("?")+1);
  // console.log("Should have username: ", username );

  var checkUserList = [];
  //Put username into final user checks list
  checkUserList.push(username);
  //Get target user's followers
  // helper.downloadUrls(["http://www.brianpchsu.com/"]);

  jsdom.env(
    "https://github.com/toddskinner",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      if(errors) console.log(errors);
      console.log(window.$(".contrib-number").text());
    }
  );

  // var contri = getContrib("https://github.com/brianpchsu", function(data){
  //   console.log(data);
  // });
  // request(url + username).pipe(fs.createWriteStream(helper.paths.archivedSites + "/" + url));
  //Put follower's info into user chck list
  //Iterate through each user and save it in a table
  //Show table in html

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

var getContrib = function(html, callback){
  jsdom.env({
    html:html,
    scripts:["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      var record = window.$(".contrib-number").text();
      callback(window.$(".contrib-number").text());
      // console.log(record);
      // console.log("Longest streak: ", window.$(".contrib-number")[1]);
      // console.log("Current streak: ", window.$(".contrib-number")[2]);
    }
  });
};

app.get("/getInfo", handleGet);
app.listen(5678);