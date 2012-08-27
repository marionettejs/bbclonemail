BBCloneMail.module("MailApp.Categories", function(Categories, App, Backbone, Marionette, $, _){

  // Entities
  // --------

  var Category = Backbone.Model.extend({});

  var CategoryCollection = Backbone.Collection.extend({
    model: Category,
    url: "/categories"
  });

  // Public API
  // ----------

  Categories.getAll = function(){
    var deferred = $.Deferred();

    var categoryCollection = new CategoryCollection();
    categoryCollection.on("reset", function(categories){
      deferred.resolve(categories);
    });

    categoryCollection.fetch();
    return deferred.promise();
  };
});
