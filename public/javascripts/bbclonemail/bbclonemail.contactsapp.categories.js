BBCloneMail.module("ContactsApp.Categories", function(Cats, App, Backbone, Marionette, $, _){
  "use strict";

  // Category View
  // -------------

  Cats.CategoryView = Marionette.ItemView.extend({
    template: "#contact-categories-view-template"
  });

});
