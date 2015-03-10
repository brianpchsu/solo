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
  tagName:'li',

  template: _.template('<img src="<%= imageUrl %>" > <%= username %> <%= lastContri %> <%= longestContri %><%= currentContri %>'),
  render:function(){
    return this.$el.html(this.template(this.model.attributes));
  },
});

//ListView (ul)
var ListView = Backbone.View.extend({
  tagName:'ul',

  events: {
    'click #submit': 'handleSubmit'

  },

  initialize: function(){
    this.collection.on('add', this.render, this);
    
    $('#submit').click(function(event) {
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
          data.forEach(function(user){
            list.add({useraccount: user['useraccount'], username: user['username'],
              imageUrl: user['imageUrl'], lastContri: user['lastContri'],
              longestContri: user['longestContri'], currentContri: user['currentContri']
             });
          });
          console.dir(data);
        },
      });
  });
    this.collection.on('add', this.render, this);
    this.render();
  },
  render: function(){
    this.$el.children().detach();
    $('#list').html(
      this.collection.map(function(listitem){
        return new ListItemView({model: listitem}).render();  
      })
    );
  },
  handleSubmit : function(event) {
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
        data.forEach(function(user){
          list.add({useraccount: user['useraccount'], username: user['username'],
            imageUrl: user['imageUrl'], lastContri: user['lastContri'],
            longestContri: user['longestContri'], currentContri: user['currentContri']
           });
        });
        console.dir(data);
      },
      });
  }
});

$(document).ready(function(){
  window.list = new List(); 
  var listView = new ListView({collection: list});

  // $('#submit').on('click', handleSubmit);

});

// var handleSubmit = function(event) {
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
//         list.add({useraccount: user['useraccount'], username: user['username'],
//           imageUrl: user['imageUrl'], lastContri: user['lastContri'],
//           longestContri: user['longestContri'], currentContri: user['currentContri']
//          });
//       });
//       console.dir(data);
//     },
//     });
// };


// var AppView = Backbone.View.extend({
//     el: document.body,
//     initialize: function(){
//       this.collection.on('add', this.collection.render, this);
//       // console.log("init");
//       // this.render();
//     },
    
//     events: {
//       'click button':'addToList'
//     },
//     render:function(){
//       this.$el.children().detach();
//       this.$el.append($('<input placeholder="What needs to be done?"><button>Add</button>'));
//       $('body').append(this.$el);
//     },
// });