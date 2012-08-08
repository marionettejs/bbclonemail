BBCloneMail = new Backbone.Marionette.Application();

BBCloneMail.addRegions({
  navigation: "#navigation",
  main: "#main"
});

BBCloneMail.on("initialize:after", function(){
  console.log("running history");
  if (Backbone.history){
    Backbone.history.start();
  }
});
