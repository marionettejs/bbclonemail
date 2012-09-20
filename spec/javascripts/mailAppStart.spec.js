describe("mail app start", function(){
  "use strict";

  describe("when starting the mail app with an empty route (#)", function(){
    var inbox, handler, getInboxHandler;

    beforeEach(function(){
      getInboxHandler = jasmine.createSpy();
      BBCloneMail.respondTo("mail:inbox", getInboxHandler);

      handler = jasmine.createSpy();
      BBCloneMail.registerCommand("show:mail:list", handler);

      inbox = BBCloneMail.module("MailApp.Inbox");
      inbox.start();

      startHistory();
    });

    afterEach(function(){
      inbox.stop();
      BBCloneMail.removeCommand("show:mail:list");
      BBCloneMail.removeRequestHandler("mail:inbox");
    });

    it("should show the inbox", function(){
      expect(handler.wasCalled).toBe(true);
    });

  });

  describe("when the mail app initializes", function(){
    var categoryNav, getCategoriesHandler;

    beforeEach(function(){
      affix("#mail-categories-view-template ul.categories li; #navigation");
      getCategoriesHandler = jasmine.createSpy();

      var cat = new Backbone.Model({id: 1, name: "cat"});
      var catCol = new Backbone.Collection([cat]);
      getCategoriesHandler.andReturn(catCol);

      BBCloneMail.respondTo("mail:categories", getCategoriesHandler);

      categoryNav = BBCloneMail.module("MailApp.CategoryNavigation");
      categoryNav.start();
    });

    afterEach(function(){
      categoryNav.stop();
      BBCloneMail.removeRequestHandler("mail:categories");
    });

    it("should show the list of categories", function(){
      var el = $("#navigation ul.categories li");
      expect(el.length).toBe(1);
    });

  });
});
