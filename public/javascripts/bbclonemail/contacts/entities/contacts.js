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

  // Contacts Repository
  // -------------------

  Contacts.Repository = Marionette.Controller.extend({

    getAll: function(){
      var deferred = $.Deferred();

      this._getContacts(function(contacts){
        deferred.resolve(contacts);
      });

      return deferred.promise();
    },

    _getContacts: function(callback){
      var contactCollection = new ContactCollection();
      contactCollection.on("reset", callback);
      contactCollection.fetch();
    }

  });
});
