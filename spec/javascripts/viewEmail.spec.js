describe("viewing an email", function(){

  mockMailModule();

  describe("when clicking an email preview", function(){
    var mailbox;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");

      mailbox = BBCloneMail.module("Mailbox");
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the full email contents", function(){
      throw new Error("not yet implemented");
    });

  });

});
