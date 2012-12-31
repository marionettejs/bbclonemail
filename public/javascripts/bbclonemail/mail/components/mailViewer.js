// Mail Viewer
// -----------
//
// View an individual email

BBCloneMail.module("MailApp.Mailboxes", function(Mailboxes, App, Backbone, Marionette, $, _){
  "use strict";
  
  // Mail View
  // ---------
  // Displays the contents of a single mail item.

  Mailboxes.MailView = Marionette.ItemView.extend({
    template: "#email-view-template",
    tagName: "ul",
    className: "email-list"
  });

  Mailboxes.MailViewer = Marionette.Controller.extend({

    initialize: function(options){
      this.region = options.region;
      this.email = options.email;
    },

    show: function(){
      var itemView = new Mailboxes.MailView({
        model: this.email
      });

      this.region.show(itemView);
    }
  });

});
