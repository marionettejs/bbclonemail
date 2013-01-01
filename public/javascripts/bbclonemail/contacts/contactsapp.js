BBCloneMail.module("ContactsApp", function(ContactsApp, App){
  "use strict";
 
  // Contact List Views
  // ------------------

  ContactsApp.ContactView = Marionette.ItemView.extend({
    template: "#contact-item-template",
    tagName: "li"
  });

  ContactsApp.ContactListView = Marionette.CollectionView.extend({
    itemView: ContactsApp.ContactView,
    tagName: "ul",
    id: "contact-list",
    className: "contact-list"
  });
  
  // Category View
  // -------------

  ContactsApp.CategoryView = Marionette.ItemView.extend({
    template: "#contact-categories-view-template"
  });

  // Contact App Controller
  // -----------------------

  ContactsApp.Controller = App.AppController.extend({
    initialize: function(options){
      this.repo = options.repo;
    },

    onShow: function(){
      this._showCategories();
    },

    showContacts: function(){
      var that = this;

      $.when(this.repo.getAll()).then(function(contacts){
        var view = new ContactsApp.ContactListView({
          collection: contacts
        });

        that.mainRegion.show(view);

        Backbone.history.navigate("contacts");
      });
    },

    // show the list of categories for the mail app
    _showCategories: function(){
      var categoryNav = new ContactsApp.CategoryView();
      this.navRegion.show(categoryNav);
    },

    getContacts: function(callback){
      return this.contactsRepo.getAll();
    }

  });

  // Initializers and Finalizers
  // ---------------------------

  ContactsApp.addInitializer(function(args){
    var repo = new ContactsApp.Contacts.Repository();

    ContactsApp.controller = new ContactsApp.Controller({
      mainRegion: args.mainRegion,
      navRegion: args.navRegion,
      appSelectorRegion: args.appSelectorRegion,
      repo: repo
    });

    ContactsApp.controller.show();
    App.vent.trigger("app:started", "contacts");
  });

  ContactsApp.addFinalizer(function(){
    if (ContactsApp.controller){
      ContactsApp.controller.close();
      delete ContactsApp.controller;
    }
  });

});
