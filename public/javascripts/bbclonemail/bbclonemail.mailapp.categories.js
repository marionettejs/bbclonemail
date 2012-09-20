BBCloneMail.module("MailApp.Categories", {
  startWithApp: false,
  define: function(Categories, App, Backbone, Marionette, $, _){
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
      this.controller = controller;

      App.respondTo("mail:categories", controller.getAll, controller);
    });

    Categories.addFinalizer(function(){
      App.removeRequestHandler("mail:categories");
      delete this.controller;
    });

  }
});
