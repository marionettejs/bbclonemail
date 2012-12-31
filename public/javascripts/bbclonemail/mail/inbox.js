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

  // Mail Preview
  // ------------
  // Displays an individual preview line item, when multiple
  // mail items are displayed as a list. When clicked, the
  // email item contents will be displayed.

  Mailboxes.MailPreview = Marionette.ItemView.extend({
    template: "#email-preview-template",
    tagName: "li",

    events: {
      "click": "previewClicked"
    },

    previewClicked: function(e){
      e.preventDefault();
      this.trigger("email:selected", this.model);
    }
  });

  // Mail List View
  // --------------
  // Displays a list of email preview items.

  Mailboxes.MailListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
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
    },

    showMailList: function(email){
      var listView = new Mailboxes.MailListView({
        collection: email
      });

      listView.on("itemview:email:selected", function(view, email){
        this.showMailItem(email);
      }, this);

      this.region.show(listView);
    },

    showMailItem: function(email){
      var itemView = new Mailboxes.MailView({
        model: email
      });

      itemView.render();
      $("#main").html(itemView.el);

      Backbone.history.navigate("inbox/mail/" + email.id);
    }

  });

});
