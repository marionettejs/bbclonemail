// Mail Inbox
// ----------
//
// Display a list of email

BBCloneMail.module("MailApp.Mailboxes", function(Mailboxes, App, Backbone, Marionette, $, _){
  "use strict";

  // Mail Preview
  // ------------
  // Displays an individual preview line item, when multiple
  // mail items are displayed as a list. When clicked, the
  // email item contents will be displayed.

  Mailboxes.MailPreview = Marionette.ItemView.extend({
    template: "#email-preview-template",
    tagName: "li",

    triggers: {
      "click": "selected"
    }
  });

  // Mail List View
  // --------------
  // Displays a list of email preview items.

  Mailboxes.MailListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemViewEventPrefix: "email",
    itemView: Mailboxes.MailPreview
  });

  // Mailbox Component Controller
  // ----------------------------
  //
  // Manages the states / transitions between displaying a
  // list of items, and single email item view

  Mailboxes.Inbox = Marionette.Controller.extend({
    initialize: function(options){
      this.region = options.region;
      this.email = options.email;
    },

    show: function(){
      var listView = new Mailboxes.MailListView({
        collection: this.email
      });

      this.listenTo(listView, "email:selected", this._emailSelected);

      this.region.show(listView);
    },

    _emailSelected: function(view, args){
      this.trigger("email:selected", args.model);
    }
  });

});
