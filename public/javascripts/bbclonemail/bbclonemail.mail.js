BBCloneMail.module("Mail", function(Mail, App, Backbone, Marionette, $, _){

  // Entities
  // --------

  var Email = Backbone.Model.extend({
  });


  var EmailCollection = Backbone.Collection.extend({
    model: Email,
    url: "/email"
  });


  // Public API
  // ----------

  Mail.getInbox = function(){
    var deferred = $.Deferred();

    var emailCollection = new EmailCollection();
    emailCollection.on("reset", function(mail){
      deferred.resolve(mail);
    });

    emailCollection.fetch();
    return deferred.promise();
  };

});
