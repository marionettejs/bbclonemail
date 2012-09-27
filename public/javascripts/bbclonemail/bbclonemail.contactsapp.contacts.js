BBCloneMail.module("ContactsApp.Contacts", function(Contacts, App, Backbone, Marionette, $, _){
  "use strict";

  // Entities
  // --------

  var Contact = Backbone.Model.extend({
    initialize: function(){
      Backbone.Compute(this);
    },

    fullName: { 
      fields: ["firstName", "lastName"], 
      compute: function(fields){
        return fields.lastName + ", " + fields.firstName;
      }
    }
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
    App.requestResponse.addHandler("contacts:all", controller.getAll, controller);

    Contacts.controller = controller;
  });

  Contacts.addFinalizer(function(){
    App.requestResponse.removeHandler("contacts:all");
    delete Contacts.controller;
  });
});
