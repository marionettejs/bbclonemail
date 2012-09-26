BBCloneMail.module("ContactsApp.Contacts", function(Contacts, App, Backbone, Marionette, $, _){
  "use strict";

  // EXPERIMENTAL
  // ------------
  //
  // Add support for computed fields

  function compute(fieldName, fieldList, callback){
    var length = fieldList.length;

    var fireCallback = function(){
      var fields = {};

      for (var i = 0; i<length; i++){
        var field = fieldList[i];
        fields[field] = this.get(field);
      }

      var value = callback.call(this, fields);
      this.set(fieldName, value);

      return value;
    }

    var computedFunc = function(){
      var cb = _.bind(fireCallback, this);

      for (var i = 0; i<length; i++){
        var field = fieldList[i];
        this.on("change:" + field, cb);
      }

      return cb();
    }

    computedFunc.computedField = true;

    return computedFunc;
  }

  function computeFields(obj){
    for(var field in obj){
      if (obj[field] && obj[field].computedField){
        obj[field].call(obj);
      }
    }
  }

  // Entities
  // --------

  var Contact = Backbone.Model.extend({
    initialize: function(){
      computeFields(this);
    },

    fullName: compute("fullName", ["firstName", "lastName"], function(fields){
      return fields.lastName + ", " + fields.firstName;
    })
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
    App.removeRequestHandler("contacts:all");
    delete Contacts.controller;
  });
});
