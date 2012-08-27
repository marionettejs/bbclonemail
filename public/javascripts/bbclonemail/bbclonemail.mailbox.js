BBCloneMail.module("Mailbox", function(Mailbox, App, Backbone, Marionette, $, _){

  // Views
  // -----

  Mailbox.MailView = Marionette.ItemView.extend({
    template: "#email-view-template",
    tagName: "ul",
    className: "email-list"
  });
  
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

  Mailbox.MailListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemView: Mailbox.MailPreview
  });

  // Controller
  // ----------
  
  Mailbox.Controller = function(mainRegion){
    this.mainRegion = mainRegion;
  };

  _.extend(Mailbox.Controller.prototype, {

    showMailList: function(email){
      var listView = new App.Mailbox.MailListView({
        collection: email
      });

      listView.on("itemview:email:selected", function(view, email){
        this.showMailItem(email);
      }, this);

      this.mainRegion.show(listView);
    },

    showMailItem: function(email){
      var itemView = new App.Mailbox.MailView({
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
