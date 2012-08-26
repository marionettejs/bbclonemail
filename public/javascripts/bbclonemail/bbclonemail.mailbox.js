BBCloneMail.module("Mailbox", function(Mailbox, App, Backbone, Marionette, $, _){

  // Views
  // -----
  //
  
  console.log("defining mailbox");
  
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

  App.registerCommand("show:mail", function(email){
    var listView = new App.Mailbox.MailListView({
      collection: email
    });

    listView.on("email:selected", this.showEmail, this);

    App.mainRegion.show(listView);
  });

});
