function startHistory(){
  if (!Backbone.hisory){
    // Initial router that provides a route we don't use
    // so Backbone.history will exist
    var router = new (Backbone.Router.extend({ 
      routes: { "empty-route": "emptyRoute"}
    }));
  }

  if (!Backbone.History.started){
    Backbone.history.start();
  }
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

  Backbone.Marionette.TemplateCache.clear();

  BBCloneMail.clearRequestHandlers();

  window.location.hash = "";
});
