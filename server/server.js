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
var http = require("http");
var https = require("https");
var fs = require("fs");

initialize();
var storage = [];

var readLog = function() {
  fs.readFile(__dirname + '/msglog.json', 'utf8', function (err, data) {
    if (err) throw err;
    console.log('read file', data);
    storage = JSON.parse(data);
  });
};

var writeLog = function() {
    fs.writeFile(__dirname + '/msglog.json', JSON.stringify(storage), function (err, data) {
    if (err) throw err;
    console.log('wrote file');
  });
};

readLog();

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(partials());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// var github = new Github({
//   token: githubcode.token,
//   auth: 'oauth'
// });

// var user = github.getUser();


var handleGet = function(request, response){
  var url = request.url.toString();
  var username = url.substring(url.indexOf("?")+1);

  var checkUserList = [];
  //Put username into final user checks list
  checkUserList.push(username);
  console.log(username);
  //Get target user's followers
  var url= "https://github.com/" + username;
  console.log("make request to : ", url);
  //Read user's contribution data
  jsdom.env(
    url,
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      if(errors) console.log(errors);
      var totalcontri = window.$(".contrib-number").text().toString();
      var lastYearContri = totalcontri.substring(0, totalcontri.indexOf('total')+5);
      var longestStreak = totalcontri.substring(totalcontri.indexOf('total')+5, totalcontri.indexOf('days')+4);
      var currentStreak = totalcontri.substring(totalcontri.indexOf('days')+4);
      var img = window.$(".avatar").attr('src');
      var savedImg = img.substring(0, img.indexOf('&s=460')+3) + "100";
      var fullname = window.$(".vcard-fullname").text();

      checkUserList.push(fullname);
      checkUserList.push(savedImg);
      checkUserList.push(lastYearContri);
      checkUserList.push(longestStreak);
      checkUserList.push(currentStreak);
      storage.push(checkUserList);
      console.log(storage);
      writeLog();
    }
  );

  // user.show(username, function(err, data) {
  //   if (err){ console.log(err)}
  //   // console.dir(data);
  //   var followerUrl = data.followers_url;
  // });
  
  response.send("ok");
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