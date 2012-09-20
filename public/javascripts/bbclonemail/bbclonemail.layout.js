BBCloneMail.module("AppLayout", function(AppLayout, App, Backbone, Marionette, $, _){
  "use strict";

  // Views
  // -----

  AppLayout.Layout = Marionette.Layout.extend({
    events: {
      "change #app-selector select": "appSelected"
    },

    initialize: function(){
      this.bindTo(App.vent, "app:started", this.showAppName, this);
    },

    appSelected: function(e){
      e.preventDefault();
      var appName = $(e.currentTarget).val();
      this.trigger("app:selected", appName);
    },

    showAppName: function(appName){
      this.$("#app-selector select").val(appName);
    }
  });

  // Controller
  // ---------

  var LayoutController = function(){};

  _.extend(LayoutController.prototype, {

    start: function(){
      this.layout = new AppLayout.Layout({
        el: "section.content"
      });

      this.layout.on("app:selected", this.appSelected, this);
    },

    appSelected: function(appName){
      App.execute("start:app", appName);
    }

  });

  // Initializer
  // -----------

  AppLayout.addInitializer(function(){
    AppLayout.controller = new LayoutController();
    AppLayout.controller.start();
  });

});
