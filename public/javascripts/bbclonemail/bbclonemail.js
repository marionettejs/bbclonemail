BBCloneMail = new Backbone.Marionette.Application();

BBCloneMail.addRegions({
  navigation: "#navigation",
  main: "#main"
});

BBCloneMail.on("initialize:after", function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});
