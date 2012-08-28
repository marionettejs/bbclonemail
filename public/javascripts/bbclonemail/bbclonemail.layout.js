BBCloneMail.module("AppLayout", function(AppLayout, BBCM, Backbone, Marionette, $, _){

  // Views
  // -----

  AppLayout.Layout = Marionette.Layout.extend({});

  // Controller
  // ---------
  
  var LayoutController = function(){};

  _.extend(LayoutController.prototype, {
    start: function(){
      this.layout = new AppLayout.Layout({
        el: "section.content"
      });
    }
  });

  // Initializer
  // -----------

  AppLayout.addInitializer(function(){
    AppLayout.controller = new LayoutController();
    AppLayout.controller.start();
  });

});
