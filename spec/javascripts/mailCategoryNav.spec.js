describe("mail category nav", function(){

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
    var view; 

    beforeEach(function(){
      var $category = BBCloneMail.nav.$el.find(".mail-category");
      $category.trigger("click");
    });

    it("should update the url hash for the category", function(){
      expect(window.location.hash).toBe("#categories/foo");
    });
    
    it("should load the mail for that category", function(){
      throw "not implemented";
    });

    it("should show the mail for that category", function(){
      throw "not implemented";
    });
  });

});
