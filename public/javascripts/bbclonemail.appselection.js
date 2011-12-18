// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

BBCloneMail.AppSelection = (function(BBCloneMail, Backbone){

  var AppSelection = {};

  AppSelection.AppSelectionView = BBCloneMail.SmartView.extend({
    events: {
      "change select": "appChanged"
    },

    appChanged: function(e){
      e.preventDefault();
      var app = $(e.currentTarget).val();
      if (app == "mail"){
        BBCloneMail.MailApp.show();
      } else {
        BBCloneMail.ContactsApp.show();
      }
    },

    setSelection: function(app){
      this.$("select").val(app);
    }
  });

  AppSelection.showSelection = function(app){
    AppSelection.view.setSelection(app);
  }

  BBCloneMail.addInitializer(function(){
    AppSelection.view = new AppSelection.AppSelectionView({
      el: $("#app-selector")
    });
  });

  return AppSelection;
})(BBCloneMail, Backbone);
