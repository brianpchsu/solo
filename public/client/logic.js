//Model
var ListModel = Backbone.Model.extend({
  default:{
    useraccount: "",
    username: "",
    imageUrl:"",
    lastContri:"",
    longestContri:"",
    currentContri:""
  }
});

//Collection
var List = Backbone.Collection.extend({
  model: ListModel
});

//List Item View (li)
var ListItemView = Backbone.View.extend({
  tagName:'tr',

  template: _.template('<td><img src="<%= imageUrl %>" ></td>&nbsp;&nbsp;<td> <%= username %></td>&nbsp;&nbsp;<td> <%= lastContri %></td>&nbsp;&nbsp;<td> <%= longestContri %></td>&nbsp;&nbsp;<td><%= currentContri %></td>'),
  render:function(){
    return this.$el.html(this.template(this.model.attributes));
  },
});

//ListView (ul)
var ListView = Backbone.View.extend({
  el:'tbody',

  events: {
    'click #submit': 'handleSubmit'
  },

  initialize: function(){
    this.collection.on('add', this.render, this);

    $('#submit').click(function(event) {
      // list = new List(); 
      console.log("here");
      var username = $('#githubhandle').val();
      // Stop the form from submitting
      event.preventDefault();
      $.ajax({
        data: username,
        url: "/getInfo",
        type: "GET",
        contentType: 'application/json',
        success: function(data){
          console.log(data);
          list.reset();
          data.forEach(function(user){
            // if (existuser.indexOf(username)>0){
            // }else {
            //   existuser.push(username);

              list.add({useraccount: user['useraccount'], username: user['username'],
                imageUrl: user['imageUrl'], lastContri: user['lastContri'],
                longestContri: user['longestContri'], currentContri: user['currentContri']
               });
            // }
          });
          console.dir(data);
        },
      });
  });
    this.render();
  },

  render: function(){
    this.$el.children().detach();
    $('tbody').html(
      this.collection.map(function(listitem){
        return new ListItemView({model: listitem}).render();  
      })
    );
  },
  // handleSubmit : function(event) {
  //   console.log("here");
  //   var username = $('#githubhandle').val();
  //   // Stop the form from submitting
  //   event.preventDefault();
  //   $.ajax({
  //     data: username,
  //     url: "/getInfo",
  //     type: "GET",
  //     contentType: 'application/json',
  //     success: function(data){
  //       data.forEach(function(user){
  //         if (existuser.indexOf(username) < 0 ){
  //           console.log("not found before");
  //           existuser.push(user['useraccount']);
  //           list.add({useraccount: user['useraccount'], username: user['username'],
  //             imageUrl: user['imageUrl'], lastContri: user['lastContri'],
  //             longestContri: user['longestContri'], currentContri: user['currentContri']
  //            });
  //         }
  //       });
  //       console.dir(data);
  //     },
  //     });
  // }
});

$(document).ready(function(){
  window.list = new List(); 
  var listView = new ListView({collection: list});
});

var existuser = [];
