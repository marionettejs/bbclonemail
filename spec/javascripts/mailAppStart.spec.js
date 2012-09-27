describe("mail app start", function(){
  "use strict";

  describe("when the mail app initializes", function(){
    var categoryNav, getCategoriesHandler, notifyAppStart;

    beforeEach(function(){
      affix("#mail-categories-view-template ul.categories li; #navigation");

      var cat = new Backbone.Model({id: 1, name: "cat"});
      var catCol = new Backbone.Collection([cat]);
      getCategoriesHandler = jasmine.createSpy();
      getCategoriesHandler.andReturn(catCol);
      BBCloneMail.requestResponse.addHandler("mail:categories", getCategoriesHandler);

      categoryNav = BBCloneMail.module("MailApp.CategoryNavigation");
      categoryNav.start();
    });

    afterEach(function(){
      categoryNav.stop();
      BBCloneMail.requestResponse.removeHandler("mail:categories");
    });

    it("should show the list of categories", function(){
      var el = $("#navigation ul.categories li");
      expect(el.length).toBe(1);
    });

    it("should notify the mail app started", function(){
    });

  });
});
