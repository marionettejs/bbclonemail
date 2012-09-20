BBCloneMail.module("MailApp.Mail", {
  startWithApp: false,
  define: function(Mail, App, Backbone, Marionette, $, _){
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

    function Controller(){}

    _.extend(Controller.prototype, {

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

    // Init & Finalize
    // ---------------

    Mail.addInitializer(function(){
      var controller = new Controller();
      this.controller = controller;

      App.respondTo("mail:inbox", controller.getAll, controller);
      App.respondTo("mail:category", controller.getByCategory, controller);
    });

    Mail.addFinalizer(function(){
      App.removeRequestHandler("mail:inbox");
      delete this.controller;
    });

  }
});
