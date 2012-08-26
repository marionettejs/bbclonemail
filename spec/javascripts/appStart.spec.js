describe("app Start", function(){

  mockMailModule();

  describe("when starting the app with an empty route (#)", function(){
    var inbox, handler;

    beforeEach(function(){
      handler = jasmine.createSpy();
      BBCloneMail.registerCommand("show:mail:list", handler);

      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      Backbone.history.start();
    });

    afterEach(function(){
      inbox.stop();
      BBCloneMail.removeCommand("show:mail:list");
    });

    it("should show the inbox", function(){
      expect(handler.wasCalled).toBe(true);
    });

  });

});
