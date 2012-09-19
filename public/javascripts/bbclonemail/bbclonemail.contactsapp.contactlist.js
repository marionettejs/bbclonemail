BBCloneMail.module("ContactsApp.ContactList", function(ContactList, App, Backbone, Marionette, $, _){

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

    this.controller = controller;
  });

  ContactList.addFinalizer(function(){
    delete this.controller;
  });
});
