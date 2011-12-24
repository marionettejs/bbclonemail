// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// App Selector
// ------------

// The app selector is the drop list on the top left of the
// application that lets you choose between "Mail" and "Contacts".
// Changing the selected app will cause the application to switch to
// that sub-app's contents and functionality.
BBCloneMail.AppSelection = (function(BBCloneMail, Backbone){
  var AppSelection = {};

  // The app selection view handles the changing of the app
  // selector drop list.
  AppSelection.AppSelectionView = BBCloneMail.ItemView.extend({
    events: {
      "change select": "appChanged"
    },

    // Figure out which app is being selected and call the
    // correct object's `show` method.
    appChanged: function(e){
      e.preventDefault();
      var appName = $(e.currentTarget).val();

      var app;
      if (appName == "mail"){
        app = BBCloneMail.MailApp;
      } else {
        app = BBCloneMail.ContactsApp;
      }

      app.show();
    },

    // Show the correct app in the select box.
    setSelection: function(app){
      this.$("select").val(app);
    }
  });

  // Public API to show the correct app in the select box.
  AppSelection.showSelection = function(app){
    AppSelection.view.setSelection(app);
  }

  // Initialize the App Selector functionality when the
  // application starts.
  BBCloneMail.addInitializer(function(){
    AppSelection.view = new AppSelection.AppSelectionView({
      el: $("#app-selector")
    });
  });

  return AppSelection;
})(BBCloneMail, Backbone);
