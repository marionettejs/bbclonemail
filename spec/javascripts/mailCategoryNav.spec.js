describe("mail app init", function(){

  mockCategoriesAjax();

  describe("when the mail app initializes", function(){
    var categories, categoryNav;

    beforeEach(function(){
      affix("#mail-categories-view-template div");
      affix("#foo");

      categories = BBCloneMail.module("MailApp.Categories");
      categories.start();

      categoryNav = BBCloneMail.module("MailApp.CategoryNavigation");
      categoryNav.start();
    });

    afterEach(function(){
      categories.stop();
      categoryNav.stop();
    });

    it("should show the list of categories", function(){
      var el = $("#navigation ul li");
      expect(el.length).toBe(1);
    });

  });

});
