BBCloneMail.module("Mailbox", function(Mailbox, App, Backbone, Marionette, $, _){

  // Views
  // -----
  
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

    showMail: function(email){
      var listView = new App.Mailbox.MailListView({
        collection: email
      });

      listView.on("email:selected", this.showEmail, this);

      this.mainRegion.show(listView);
    }

  });

  // Initializers And Finalizers
  // ---------------------------

  Mailbox.addInitializer(function(){
    Mailbox.controller = new Mailbox.Controller(App.main);

    App.registerCommand("show:mail", function(email){
      Mailbox.controller.showMail(email);
    });
  });

  Mailbox.addFinalizer(function(){
    delete Mailbox.controller;
  });

});
