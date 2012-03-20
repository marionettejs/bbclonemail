(function(BBCloneMail, Backbone, $){

  // The application layout
  var Layout = Backbone.Marionette.Layout.extend({
    template: "#layout-template",

    // These are my visual regions: the "navigation" or
    // left hand list of categories, and the "main"
    // content area where the email list or contact list
    // is displayed.
    regions: {
      navigation: "#navigation",
      main: "#main"
    },

    // Handle the switching of the app between mail and contacts
    events: {
      "change #app-selector select": "appChanged"
    },

    initialize: function(){
      // Make sure the `setSelection` method is always running in
      // the context of this view.
      _.bindAll(this, "setSelection");

      // Bind the events to show the correct app selection.
      this.setupAppSelectionEvents();
    },

    // Figure out which app is being selected and call the
    // correct object's `show` method.
    appChanged: function(e){
      e.preventDefault();
      var appName = $(e.currentTarget).val();

      if (appName == "mail"){
        BBCloneMail.MailApp.showInbox();
      } else {
        BBCloneMail.ContactsApp.showContactList();
      }
    },

    // Show the correct app in the select box.
    setSelection: function(app){
      this.$("select").val(app);
    },

    setupAppSelectionEvents: function(){
      var that = this;

      // When the mail app is shown, be sure we are displaying "Mail"
      // in the app selector.
      BBCloneMail.vent.bind("mail:show", function(){
        that.setSelection("mail");
      });

      // When the contacts app is shown, be sure we are displaying 
      // "Contacts" in the app selector.
      BBCloneMail.vent.bind("contacts:show", function(){
        that.setSelection("contacts");
      });
    }
  });

  // Initialize the application layout and when the layout has
  // been rendered and displayed, then start the rest of the
  // application
  BBCloneMail.addInitializer(function(){
    // Render the layout and get it on the screen, first
    BBCloneMail.layout = new Layout();
    var layoutRender = BBCloneMail.layout.render()
    $("body").prepend(BBCloneMail.layout.el);

    // This kicks off the rest of the app, through the router
    layoutRender.done(function(){
      Backbone.history.start();
    });
  });

})(BBCloneMail, Backbone, $);
