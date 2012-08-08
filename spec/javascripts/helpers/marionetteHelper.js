Backbone.Marionette.Region.prototype.reset = function(){
  this.close();
  delete this.$el;
};

afterEach(function(){
  BBCloneMail.main.reset();

  if (Backbone.history){
    Backbone.history.stop();
    delete Backbone.history;
  }
});
