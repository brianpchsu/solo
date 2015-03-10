var app;

$(function(){
  app = {
    server: "https://api.github.com/users/",
    
    init: function(){
      app.$findUser = $('#submit');
      app.$findUser.on('click', app.handleSubmit);
    },
    getInfo: function(username){
      $.ajax({
        data: username,
        url: "/getInfo",
        type: "GET",
        contentType: 'application/json',
        success: function(data){
          console.dir(data);
          // var followers = JSON.parse(data.followers_url);
          // var following = JSON.parse(data.following_url);
          // var friends = [];
          // for (var i = 0; i< followers.length; i++){
          //   friends.push(followers[i][login]);
          // }
          // for (var i = 0; i< following.length; i++){
          //   friends.push(followers[i][login]);
          // }
          // console.log(friends);
        }
      });
    },
    handleSubmit:function(event) {
      var username = $('#githubhandle').val();
      app.getInfo(username);
      // Stop the form from submitting
      event.preventDefault();
    },
  }
});