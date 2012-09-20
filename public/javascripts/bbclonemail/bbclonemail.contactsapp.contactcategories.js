BBCloneMail.module("ContactsApp.ContactCategories", function(Cats, App, Backbone, Marionette, $, _){
  "use strict";

  // Category View
  // -------------

  Cats.CategoryView = Marionette.ItemView.extend({
    template: "#contact-categories-view-template"
  });

  // Initializer
  // -----------

  Cats.addInitializer(function(){
    var view = new Cats.CategoryView();
    App.nav.show(view);
  });
});
