describe("viewing an email", function(){

  mockMailModule();

  describe("when clicking an email preview", function(){
    var inbox;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");

      inbox = BBCloneMail.module("Mailbox");
      inbox.start();

    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show the full email contents", function(){
      throw new Error("not yet implemented");
    });

  });

});
