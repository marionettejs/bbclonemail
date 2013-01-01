// Application Selector
// --------------------
//
// Display the list of applications to choose from
// and move to that application when the selection is changed
BBCloneMail.AppSelector = (function(App, Marionette){

  // Selector View
  // -------------

  SelectorView = Marionette.ItemView.extend({
    template: "#app-selector-template",
    tagName: "select",

    events: {
      "change": "appSelected"
    },

    appSelected: function(e){
      e.preventDefault();

      var name = $(e.currentTarget).val();
      this.trigger("app:selected", name);
    },

    setCurrent: function(appName){
      this.$("[value=" + appName + "]").attr("selected", "selected");
    }
  });
  
  // Component Controller
  // --------------------
  //
  // Runs the app selector component, coordinating
  // between the view and the various other parts of
  // the app selection process

  return Marionette.Controller.extend({

    // Hang on to the region in which the 
    // selector will be displayed
    initialize: function(options){
      this.region = options.region;
      this.currentApp = options.currentApp;
      App.vent.on("app:started", this._setCurrentApp, this);
    },

    onClose: function(){
      App.vent.off("app:started", this._setCurrentApp, this);
    },

    // show the selector view and set up the
    // event handler for changing the current app
    show: function(){
      this.selectorView = this._getSelectorView();
      this.region.show(this.selectorView);
    },

    _getSelectorView: function(){
      var view = new SelectorView();

      // set the current app on first render
      this.listenTo(view, "render", function(){
        this._setCurrentApp(this.currentApp);
      });

      // listen to the app selection change
      this.listenTo(view, "app:selected", this._appSelected);

      return view;
    },

    // store the current app and show it in the view
    _setCurrentApp: function(appName){
      this.selectorView.setCurrent(appName);
      this.currentApp = appName;
    },

    // handle app selection change
    _appSelected: function(app){
      Backbone.history.navigate(app, true);
    },

    // close the region and view when this component closes
    onClose: function(){
      if (this.region){
        this.region.close();
        delete this.region;
      }
    }
  });

})(BBCloneMail, Marionette);
