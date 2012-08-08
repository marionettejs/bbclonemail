describe("app Start", function(){

  mockMailModule();

  describe("when starting the app with an empty route (#)", function(){
    var inbox;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");
      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      Backbone.history.start();
    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show the inbox", function(){
      expect($("#main")[0].outerHTML).toMatch(/<ul class="email-list">/);
    });

  });

});
