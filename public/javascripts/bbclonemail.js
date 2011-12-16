// Rendering is 99% the same across all of my
// views, so I've encapsulated the logic of it
// here, by providing a prototype render method
// on `Backbone.View`. Of course, this can be 
// overridden in a specific view instance, which
// you'll see in other places.
Backbone.View.prototype.render = function(){
  var data;

  if (this.model){data = this.model.toJSON();}
  if (this.collection){data = this.collection.toJSON();}

  var html = $(this.template).tmpl(data);
  $(this.el).html(html);
}

// This is the primary application definition and
// application namespace. It's important to keep
// the JavaScript global scope clean, so everything
// we will do hangs off the 'Application' instance.
BBCloneMail = new Backbone.Marionette.Application();

// These are my visual regions: the "navigation" or
// left hand list of categories, and the "main"
// content area where the email list or contact list
// is displayed.
BBCloneMail.addRegions({
  navigationRegion: "#navigation",
  mainRegion: "#main"
});

// This kicks off after all of my other application
// initializers have fired, and starts the Backbone
// history. Doing that fires off the router's route
// based on the #hash fragment in the URL, and gets
// the app up and running in the correct mode.
BBCloneMail.bind("initialize:after", function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});
