function startHistory(){
  if(!Backbone.history){
    // Initial router that provides a route we don't use
    // so Backbone.history will exist
    var router = new Backbone.Router();
    router.route("-/-/-/mockroute", function(){});
  }

  Backbone.history.start();
}

beforeEach(function(){
  BBCloneMail.main.reset();
  BBCloneMail.nav.reset();
});

afterEach(function(){
  if (Backbone.history){
    Backbone.history.stop();
    delete Backbone.history;
  }

  window.location.hash = "";
});
