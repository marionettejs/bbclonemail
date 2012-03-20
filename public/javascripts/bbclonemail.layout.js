(function(BBCloneMail, Backbone, $){

  // The application layout
  var Layout = Backbone.Marionette.Layout.extend({
    template: "#layout-template",

    regions: {
      navigation: "#navigation",
      main: "#main"
    }
  });

  // Initialize the application layout and when the layout has
  // been rendered and displayed, then start the rest of the
  // application
  BBCloneMail.addInitializer(function(){
    // Render the layout and get it on the screen, first
    BBCloneMail.layout = new Layout();
    var layoutRender = BBCloneMail.layout.render()
    $("body").prepend(BBCloneMail.layout.el);

    // This kicks off the rest of the app, through the router
    layoutRender.done(function(){
      Backbone.history.start();
    });
  });

})(BBCloneMail, Backbone, $);
