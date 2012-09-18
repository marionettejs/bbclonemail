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

  describe("when clicking a mail category", function(){
    var showCategoryHandler;

    beforeEach(function(){
      showCategoryHandler = jasmine.createSpy();
      BBCloneMail.registerCommand("show:category", showCategoryHandler);

      var $category = BBCloneMail.nav.$el.find(".mail-category");
      $category.trigger("click");
    });

    it("should show the mail for that category", function(){
      expect(showCategoryHandler).wasCalled();
    });
  });

});
