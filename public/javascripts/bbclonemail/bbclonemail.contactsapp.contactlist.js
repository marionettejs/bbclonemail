BBCloneMail.module("ContactsApp.ContactList", { 
  startWithApp: false,
  define: function(ContactList, App, Backbone, Marionette, $, _){
    "use strict";

    // Contact List Views
    // ------------------

    ContactList.ContactView = Marionette.ItemView.extend({
      template: "#contact-item-template",
      tagName: "li"
    });

    ContactList.ContactListView = Marionette.CollectionView.extend({
      itemView: ContactList.ContactView,
      tagName: "ul",
      id: "contact-list",
      className: "contact-list"
    });

    // Contact List Controller
    // -----------------------

    ContactList.Controller = function(region){
      this.region = region;
    };

    _.extend(ContactList.Controller.prototype, {

      showContacts: function(){
        var that = this;

        this.getContacts(function(contacts){
          var view = new ContactList.ContactListView({
            collection: contacts
          });

          that.region.show(view);
        });

        Backbone.history.navigate("contacts");
      },

      getContacts: function(callback){
        var contactRequest = App.request("contacts:all");
        $.when(contactRequest).then(function(contacts){
          callback(contacts);
        });
      }

    });

    // Initializers and Finalizers
    // ---------------------------

    ContactList.addInitializer(function(){
      var controller = new ContactList.Controller(App.main);
      controller.showContacts();

      ContactList.controller = controller;
    });

    ContactList.addFinalizer(function(){
      delete ContactList.controller;
    });
  }
});
