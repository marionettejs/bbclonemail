describe("inbox", function(){

  mockMailModule();

  describe("when viewing the inbox", function(){
    var inbox, handler;

    beforeEach(function(){
      handler = jasmine.createSpy();
      BBCloneMail.registerCommand("show:mail:list", handler);

      inbox = BBCloneMail.module("MailApp.Inbox");
      inbox.start();

      inbox.controller.showInbox();
    });

    afterEach(function(){
      inbox.stop();
      BBCloneMail.removeCommand("show:mail:list");
    });

    it("should show all messages", function(){
      expect(handler.wasCalled).toBe(true);
    });

  });

  describe("when routing to an individual email", function(){
    var inbox, email, handler;

    beforeEach(function(){
      handler = jasmine.createSpy();
      BBCloneMail.registerCommand("show:mail:item", handler);
      affix("article#main; #email-view-template li");

      BBCloneMail.main.reset();
      BBCloneMail.main.ensureEl();

      inbox = BBCloneMail.module("MailApp.Inbox");
      inbox.start();

      window.location.hash = "inbox/mail/1";
      startHistory();
    });

    afterEach(function(){
      inbox.stop();
      BBCloneMail.removeCommand("show:mail:item");
    });

    it("should show the full email contents", function(){
      expect(handler.wasCalled).toBe(true);
    });

  });

});
