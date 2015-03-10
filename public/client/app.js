var app;

$(function(){
  app = {
    // server: "https://api.github.com/users/",
    
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
          data.forEach(function(user){
            console.log(user);
            $fullName = $('<span>' + user[1] + '</span>').text();
            // $img = $('<img>');
            // $img.attr('src', user[2]);
            $totalCont = $('<span>' + user[3] + '</span>').text();
            $longestCount = $('<span>' + user[4] + '</span>').text();
            $currentCount = $('<span>' + user[5] + '</span>').text();
            $finalString = $fullName + $totalCont + $longestCount + $currentCount;
            console.log($finalString);
            $('.users').append($finalString);
          })
          
          console.dir(data);
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