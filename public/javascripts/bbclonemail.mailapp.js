// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// MailApp
// -------

// This is the app controller or sub-application
// for email. It contains all of the 
// high level knowledge of how to run the app
// when it's in mail mode.
BBCloneMail.MailApp = (function(BBCloneMail, Backbone){
  var MailApp = {};

  // Email model and collection. These are pretty much
  // self explanatory.
  MailApp.Email = Backbone.Model.extend({});

  MailApp.EmailCollection = Backbone.Collection.extend({
    model: MailApp.Email
  });

  // This is a "MailApp" method that is called whenever
  // we are switching the BBMailCone app into mail mode.
  // It replaces all of the visual regions with the 
  // correct content by calling the `show` method for the
  // correct region manager.
  MailApp.show = function(){

    // Show the mail box with email entries
    BBCloneMail.mainRegion.show(new BBCloneMail.MailApp.MailBox({
      collection: MailApp.emailList
    }));

    // Show the mail categories list
    BBCloneMail.navigationRegion.show(new BBCloneMail.MailApp.Categories.CategoriesView({
      collection: MailApp.Categories.categoryCollection
    }));

    // Updates the url's #hash fragment with the correct hash
    BBCloneMail.showRoute("inbox");

    // Updates the app mode select box
    BBCloneMail.AppSelection.showSelection("mail");
  };

  // Initializes the email collection object with the list
  // of emails that are passed in from the call to 
  // `BBCloneMail.start`.
  BBCloneMail.addInitializer(function(options){
    MailApp.emailList = new MailApp.EmailCollection(options.email);
  });
  
  return MailApp;
})(BBCloneMail, Backbone);
