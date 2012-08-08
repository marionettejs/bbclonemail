describe("app start", function(){

  mockMailModule();

  describe("when starting the app with an empty route (#)", function(){
    var inbox;

    beforeEach(function(){
      affix("#main");
      affix("#email-preview-template div");
      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      Backbone.history.start();
    });

    afterEach(function(){
      Backbone.history.stop();
      inbox.stop();
    });

    it("should show the inbox", function(){
      expect($("#main")).toContainHtml(/<ul class="email-list">/);
    });

  });

});
