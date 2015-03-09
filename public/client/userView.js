Saga.UserView = Backbone.View.extend({

  template: "<div></div>",

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});