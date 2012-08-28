describe("mail category nav", function(){

  var getCategoriesHandler;

  beforeEach(function(){
    getCategoriesHandler = jasmine.createSpy();

    var cat = new Backbone.Model({id: 1, name: "cat"});
    var catCol = new Backbone.Collection([cat]);
    getCategoriesHandler.andReturn(catCol);

    BBCloneMail.respondTo("mail:categories", getCategoriesHandler);
  });

  afterEach(function(){
    BBCloneMail.removeRequestHandler("mail:categories");
  });

  describe("when the mail app initializes", function(){
    var categoryNav;

    beforeEach(function(){
      affix("#mail-categories-view-template ul.categories li; #navigation");

      categoryNav = BBCloneMail.module("MailApp.CategoryNavigation");
      categoryNav.start();
    });

    afterEach(function(){
      categoryNav.stop();
    });

    it("should show the list of categories", function(){
      var el = $("#navigation ul.categories li");
      expect(el.length).toBe(1);
    });

  });

});
