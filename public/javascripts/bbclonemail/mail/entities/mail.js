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

  // Mailbox Controller
  // ------------------

  Mail.Mailbox = Marionette.Controller.extend({
    getAll: function(){
      var deferred = $.Deferred();

      this._getMail(function(mail){
        deferred.resolve(mail);
      });

      return deferred.promise();
    },

    getById: function(id){
      var deferred = $.Deferred();

      this._getMail(function(mailList){
        var mail = mailList.get(id);
        deferred.resolve(mail);
      });

      return deferred.promise();
    },

    getByCategory: function(categoryName){
      var deferred = $.Deferred();

      this._getMail(function(unfiltered){
        var filtered = unfiltered.filter(function(mail){
          var categories = mail.get("categories");
          return _.include(categories, categoryName);
        });

        var mail = new EmailCollection(filtered);
        deferred.resolve(mail);
      });

      return deferred.promise();
    },

    _getMail: function(callback){
      var emailCollection = new EmailCollection();
      emailCollection.on("reset", callback);
      emailCollection.fetch();
    }
  });
});
