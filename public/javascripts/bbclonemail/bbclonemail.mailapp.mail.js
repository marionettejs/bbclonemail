BBCloneMail.module("MailApp.Mail", function(Mail, App, Backbone, Marionette, $, _){

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

      var emailCollection = new EmailCollection();
      emailCollection.on("reset", function(mail){
        deferred.resolve(mail);
      });

      emailCollection.fetch();
      return deferred.promise();
    }

  });

  // Init & Finalize
  // ---------------

  Mail.addInitializer(function(){
    var controller = new Controller();
    App.respondTo("mail:inbox", controller.getAll, controller);

    this.controller = controller;
  });

  Mail.addFinalizer(function(){
    App.removeRequestHandler("mail:inbox");
    delete this.controller;
  });

});
