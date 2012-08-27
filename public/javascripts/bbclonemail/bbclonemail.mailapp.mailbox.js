BBCloneMail.module("MailApp.Mailbox", function(Mailbox, App, Backbone, Marionette, $, _){

  // Mail View
  // ---------
  // Displays the contents of a single mail item.

  Mailbox.MailView = Marionette.ItemView.extend({
    template: "#email-view-template",
    tagName: "ul",
    className: "email-list"
  });
  
  // Mail Preview
  // ------------
  // Displays an individual preview line item, when multiple
  // mail items are displayed as a list. When clicked, the
  // email item contents will be displayed.

  Mailbox.MailPreview = Marionette.ItemView.extend({
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

  Mailbox.MailListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemView: Mailbox.MailPreview
  });

  // Controller
  // ----------
  // Manages the states / transitions between displaying a
  // list of items, and single email item view
  
  Mailbox.Controller = function(mainRegion){
    this.mainRegion = mainRegion;
  };

  _.extend(Mailbox.Controller.prototype, {

    showMailList: function(email){
      var listView = new Mailbox.MailListView({
        collection: email
      });

      listView.on("itemview:email:selected", function(view, email){
        this.showMailItem(email);
      }, this);

      this.mainRegion.show(listView);
    },

    showMailItem: function(email){
      var itemView = new Mailbox.MailView({
        model: email
      });

      itemView.render();
      $("#main").html(itemView.el);
    }

  });

  // Initializers And Finalizers
  // ---------------------------

  Mailbox.addInitializer(function(){
    var controller = new Mailbox.Controller(App.main);

    // Register command handlers to show a list of
    // email items, or a single email item
    App.registerCommand("show:mail:list", controller.showMailList, controller);
    App.registerCommand("show:mail:item", controller.showMailItem, controller);

    Mailbox.controller = controller;
  });

  Mailbox.addFinalizer(function(){
    App.removeCommand("show:mail:list");
    App.removeCommand("show:mail:item");
    delete Mailbox.controller;
  });

});
