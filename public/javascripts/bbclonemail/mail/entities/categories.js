BBCloneMail.module("MailApp.Categories", function(Categories, App, Backbone, Marionette, $, _){
  "use strict";

  // Entities
  // --------

  var Category = Backbone.Model.extend({});

  var CategoryCollection = Backbone.Collection.extend({
    model: Category,
    url: "/categories"
  });

  // Controller
  // ----------

  function Controller(){}

  _.extend(Controller.prototype, {

    getAll: function(){
      var deferred = $.Deferred();

      var categoryCollection = new CategoryCollection();
      categoryCollection.on("reset", function(categories){
        deferred.resolve(categories);
      });

      categoryCollection.fetch();
      return deferred.promise();
    }

  });

  // Init & Finialize
  // ----------------

  Categories.addInitializer(function(){
    var controller = new Controller();
    Categories.controller = controller;

    App.reqres.addHandler("mail:categories", controller.getAll, controller);
  });

  Categories.addFinalizer(function(){
    App.reqres.removeHandler("mail:categories");
    delete Categories.controller;
  });
});
