BBCloneMail.module("MailApp.Mail", function(Mail, App, Backbone, Marionette, $, _){
  "use strict";

  // Entities
  // --------

  var Email = Backbone.Model.extend({
  });

  var EmailCollection = Backbone.Collection.extend({
    model: Email,
    url: "/email"
  });

  // Controller
  // ----------

  var Controller = Marionette.Controller.extend({
    getAll: function(){
      var deferred = $.Deferred();

      this.getMail(function(mail){
        deferred.resolve(mail);
      });

      return deferred.promise();
    },

    getByCategory: function(categoryName){
      var deferred = $.Deferred();

      this.getMail(function(unfiltered){
        var filtered = unfiltered.filter(function(mail){
          var categories = mail.get("categories");
          return _.include(categories, categoryName);
        });

        var mail = new EmailCollection(filtered);
        deferred.resolve(mail);
      });

      return deferred.promise();
    },

    getMail: function(callback){
      var emailCollection = new EmailCollection();
      emailCollection.on("reset", callback);
      emailCollection.fetch();
    }
  });
});
