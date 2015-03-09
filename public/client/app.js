$(function(){
  $('#findUser').submit(function(e){
    var userhandle = $('#githubhandle').val();

    e.preventDefault();
    $.ajax({
      url: "https://api.github.com/users/" + userhandle,
      type: "GET"
    }).done(function(data){
      console.log(data);
      var followers = JSON.parse(data.followers_url);
      var following = JSON.parse(data.following_url);
      var friends = [];
      for (var i = 0; i< followers.length; i++){
        friends.push(followers[i][login]);
      }
      for (var i = 0; i< following.length; i++){
        friends.push(followers[i][login]);
      }
      console.log(friends);
    });

  });
});