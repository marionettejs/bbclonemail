BBCloneMail.module("Inbox", function(Inbox, App, Backbone, Marionette, $, _){

  // Router
  // ------

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "show"
    }
  });

  // Views
  // -----
  
  var MailPreview = Marionette.ItemView.extend({
    template: "#email-preview-template",
    tagName: "li"
  });

  var MailListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemView: MailPreview
  });

  // Controller
  // ----------

  var InboxController = function(mainRegion){
    this.mainRegion = mainRegion;
  };

  _.extend(InboxController.prototype, {

    show: function(){
      var that = this;
      console.log("showing the inbox");
      var whenEmail = App.Mail.getInbox();

      whenEmail.done(function(email){
        var listView = new MailListView({
          collection: email
        });

        that.mainRegion.show(listView);
      });
    }

  });

  // Initializers
  // ------------
  
  Inbox.addInitializer(function(){
    console.log("initializing the inbox");
    Inbox.controller = new InboxController(App.main);
    new Router({
      controller: Inbox.controller
    });
  });

  Inbox.addFinalizer(function(){
    console.log("finalizing the inbox");
    delete Inbox.controller;
  });
});
