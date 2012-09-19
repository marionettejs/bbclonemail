BBCloneMail.module("ContactsApp.Contacts", function(Contacts, App, Backbone, Marionette, $, _){
  
  // Entities
  // --------

  var Contact = Backbone.Model.extend({
  });

  var ContactCollection = Backbone.Collection.extend({
    model: Contact,
    url: "/contacts"
  });

  // Contacts Controller
  // -------------------
  
  Contacts.Controller = function(){};

  _.extend(Contacts.Controller.prototype, {

    getAll: function(){
      var deferred = $.Deferred();

      this.getContacts(function(contacts){
        deferred.resolve(contacts);
      });

      return deferred.promise();
    },

    getContacts: function(callback){
      var contactCollection = new ContactCollection();
      contactCollection.on("reset", callback);
      contactCollection.fetch();
    }

  });

  Contacts.addInitializer(function(){
    var controller = new Contacts.Controller();
    App.respondTo("contacts:all", controller.getAll, controller);

    this.controller = controller;
  });

  Contacts.addFinalizer(function(){
    App.removeRequestHandler("contacts:all");
    delete this.controller;
  });
});
