BBCloneMail.module("AppLayout", function(AppLayout, BBCM, Backbone, Marionette, $, _){

  AppLayout.Layout = Marionette.Layout.extend({
  });

  var LayoutController = function(){};

  _.extend(LayoutController.prototype, {
    start: function(){
      this.layout = new AppLayout.Layout({
        el: "section.content"
      });
    }
  });

  AppLayout.addInitializer(function(){
    AppLayout.controller = new LayoutController();
    AppLayout.controller.start();
  });
});
