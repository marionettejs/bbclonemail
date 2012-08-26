describe("inbox", function(){

  mockMailModule();

  describe("when viewing the inbox", function(){
    var inbox, handler;

    beforeEach(function(){
      handler = jasmine.createSpy();
      BBCloneMail.registerCommand("show:mail", handler);

      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      inbox.controller.showInbox();
    });

    afterEach(function(){
      inbox.stop();
      BBCloneMail.removeCommand("show:mail");
    });

    it("should show all messages", function(){
      expect(handler.wasCalled).toBe(true);
    });

  });

});
