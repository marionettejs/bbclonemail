describe("mail category nav", function(){
  "use strict";

  var categoryHandler, Nav;

  beforeEach(function(){
    affix("#mail-categories-view-template ul.customCategories li a.mail-category[data-category=foo]");
    affix("#navigation");

    categoryHandler = function(){ return new Backbone.Collection([{ name: "undefined" }]); };
    BBCloneMail.respondTo("mail:categories", categoryHandler);
    Nav = BBCloneMail.module("MailApp.CategoryNavigation");
    Nav.start();

    startHistory();
  });

  afterEach(function(){
    BBCloneMail.removeRequestHandler("mail:categories");
    Nav.stop();
  });

});
