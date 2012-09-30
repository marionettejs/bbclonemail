BBCloneMail.module("ContactsApp", { 
  startWithParent: false,
  define: function(ContactsApp, App){
    "use strict";

    // Contact App Controller
    // -----------------------

    ContactsApp.Controller = function(repo, mainRegion, navRegion){
      $.resolve(this);

      this.contactsRepo = repo;
      this.mainRegion = mainRegion;
      this.navRegion = navRegion;
    };

    _.extend(ContactsApp.Controller.prototype, {

      start: function(){
        this.showCategories();
      },

      showCategories: function(){
        var view = new ContactsApp.Categories.CategoryView();
        this.navRegion.show(view);
      },

      showContacts: {
        resolve: "getContacts",
        run: function(contacts){
          var view = new ContactsApp.ContactList.ContactListView({
            collection: contacts
          });

          this.mainRegion.show(view);

          Backbone.history.navigate("contacts");
        }
      },

      getContacts: function(callback){
        return this.contactsRepo.getAll();
      }

    });

    // Public API
    // ----------

    ContactsApp.showContacts = function(){
      ContactsApp.controller.showContacts();
    }

    // Initializers and Finalizers
    // ---------------------------

    ContactsApp.addInitializer(function(){
      var repo = new ContactsApp.Contacts.Repository();

      ContactsApp.controller = new ContactsApp.Controller(repo, App.main, App.nav);
      ContactsApp.controller.start();

      App.vent.trigger("app:started", "ContactsApp");
    });

    ContactsApp.addFinalizer(function(){
      delete ContactsApp.ContactList.controller;
    });

  }
});
