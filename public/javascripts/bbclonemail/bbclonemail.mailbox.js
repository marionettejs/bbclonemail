BBCloneMail.module("Mailbox", function(Mailbox, App, Backbone, Marionette, $, _){

  // Views
  // -----

  Mailbox.MailView = Marionette.ItemView.extend({
    template: "#email-view-template"
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

      listView.on("email:selected", this.showEmail, this);

      this.mainRegion.show(listView);
    },

    showMailItem: function(email){
      var itemView = new App.Mailbox.MailView({
        model: email
      });

      this.mainRegion.show(itemView);
    }

  });

  // Initializers And Finalizers
  // ---------------------------

  Mailbox.addInitializer(function(){
    Mailbox.controller = new Mailbox.Controller(App.main);

    App.registerCommand("show:mail:list", function(emailList){
      Mailbox.controller.showMailList(emailList);
    });

    App.registerCommand("show:mail:item", function(email){
      Mailbox.controller.showMailItem(email);
    });
  });

  Mailbox.addFinalizer(function(){
    delete Mailbox.controller;
  });

});
