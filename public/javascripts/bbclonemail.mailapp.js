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

  // Define the email model and collection.
  MailApp.Email = Backbone.Model.extend({});
  MailApp.EmailCollection = Backbone.Collection.extend({
    model: MailApp.Email
  });

  // Mail App Helper Methods
  // -----------------------

  // This method instantiates the mailbox view and populates
  // it with the specified mail list. Then it passes that
  // view instance to the mainRegion to show it on the screen.
  var displayEmailList = function(emailList){
    var mailBox = new BBCloneMail.MailApp.MailBox.EmailListView({
      collection: emailList
    })
    BBCloneMail.mainRegion.show(mailBox);
  }

  // Filter the mail by the category, if one was specified
  var showFilteredEmailList = function(category){
    var filteredMail = MailApp.emailList;
   
    // Do the actual filtering
    if (category){
      filteredMail = filteredMail.filter(function(email){
        var categories = email.get("categories");
        var found = categories.indexOf(category) >= 0;
        return found;
      });
      filteredMail = new MailApp.EmailCollection(filteredMail);
    }
    
    // display the filtered email list
    displayEmailList(filteredMail);
  }

  // Show the mail categories list
  var showCategoryList = function(){
    var categoryView = new BBCloneMail.MailApp.Categories.CategoriesView({
      collection: MailApp.Categories.categoryCollection
    })
    BBCloneMail.navigationRegion.show(categoryView);
  }

  // Mail App Public API
  // -------------------

  // Show the inbox with all email.
  MailApp.show = function(){
    // Delegate to show category, which displays
    // everthing when not category provided.
    MailApp.showCategory();
    BBCloneMail.vent.trigger("mail:show");
  };

  // Show a list of email for the given category.
  MailApp.showCategory = function(category){
    showFilteredEmailList(category);
    showCategoryList();
  };

  // Show an individual email message, by Id
  MailApp.showMessage = function(messageId){
    showCategoryList();
    var email = MailApp.emailList.get(messageId);
    MailApp.MailBox.showMessage(email);
  };

  // Mail App Event Handlers
  // -----------------------

  // When a category is selected, filter the mail list
  // based on it.
  BBCloneMail.vent.bind("mail:category:show", function(category){
    showFilteredEmailList(category);
  });

  // When the mail app is shown or `inbox` is clicked,
  // show all the mail.
  BBCloneMail.vent.bind("mail:show", function(){
    showFilteredEmailList();
  });

  // Mail App Initializer
  // --------------------

  // Initializes the email collection object with the list
  // of emails that are passed in from the call to 
  // `BBCloneMail.start`.
  BBCloneMail.addInitializer(function(options){
    MailApp.emailList = new MailApp.EmailCollection(options.email);
  });
  
  return MailApp;
})(BBCloneMail, Backbone);
