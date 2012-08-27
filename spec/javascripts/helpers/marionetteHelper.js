afterEach(function(){
  BBCloneMail.main.reset();
  BBCloneMail.nav.reset();

  if (Backbone.history){
    Backbone.history.stop();
    delete Backbone.history;
  }
});
