// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// MailApp.Mailbox
// ---------------

// The mail box view to display the list of emails
// for the mailbox.
BBCloneMail.MailApp.MailBox = (function(BBCloneMail, Backbone, $){
  
  // The the full contents of the email.
  var EmailView = BBCloneMail.ItemView.extend({
    tagName: "li",
    template: "#email-view-template",

    onRender: function(){
      BBCloneMail.vent.trigger("mail:message:show", this.model);
    }
  });

  // Show a preview of the email in the list of
  // available email.
  var EmailPreview = BBCloneMail.ItemView.extend({
    tagName: "li",
    template: "#email-preview-template",

    // The click event toggles the show and hide of
    // the email contents.
    events: {
      "click": "showEmail"
    },

    // Show or hide the body of the email when
    // the email header is clicked.
    showEmail: function(e){
      var emailView = new EmailView({
        model: this.model
      });
      BBCloneMail.mainRegion.show(emailView);
    }
  });

  // The actual mail box view, which renders each
  // of the individual email items. 
  var EmailListView = BBCloneMail.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemView: EmailPreview
  });

  return EmailListView;
})(BBCloneMail, Backbone, jQuery);
