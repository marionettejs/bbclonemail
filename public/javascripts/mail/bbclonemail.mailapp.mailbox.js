// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// MailApp.Mailbox
// ---------------

// The Mailbox is a sub-app of the Mail App. It controls the 
// display of the mail list and the individual emails.
BBCloneMail.module("MailApp.MailBox", function(MailBox, BBCloneMail, Backbone, Marionette, $, _){

  // Mail Box Views
  // --------------
  
  // The the full contents of the email.
  var EmailView = Marionette.ItemView.extend({
    tagName: "ul",
    className: "email-list email-view",
    template: "#email-view-template"
  });

  // Show a preview of the email in the list. Clicking
  // on it will show the full contents of the email.
  var EmailPreview = Marionette.ItemView.extend({
    tagName: "li",
    template: "#email-preview-template",

    events: {
      "click": "showEmail"
    },

    showEmail: function(e){
      BBCloneMail.vent.trigger("mail:message:show", this.model);
    }
  });

  // The actual mail box view, which renders each
  // of the individual email items. 
  var EmailListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemView: EmailPreview
  });

  // Mail Box Public API
  // -------------------

  // A method to display a specific email message.
  MailBox.showMessage = function(message){
    var emailView = new EmailView({
      model: message
    });
    BBCloneMail.layout.main.show(emailView);
  }

  // A method to display a list of supplied email messages.
  MailBox.showMail = function(emailList){
    var emailListView = new EmailListView({
      collection: emailList
    });
    BBCloneMail.layout.main.show(emailListView);
  }

  // Mail Box Event Handlers
  // -----------------------

  // Handle the selection of an email message by displaying
  // it in the main area of the application.
  BBCloneMail.vent.bind("mail:message:show", function(message){
    MailBox.showMessage(message);
  });

});
