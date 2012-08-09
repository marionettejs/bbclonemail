afterEach(function(){
  BBCloneMail.main.reset();

  if (Backbone.history){
    Backbone.history.stop();
    delete Backbone.history;
  }
});
