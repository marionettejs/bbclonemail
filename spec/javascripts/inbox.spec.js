describe("inbox", function(){

  mockMailModule();

  beforeEach(function(){
    affix("article#main");
  });

  describe("when viewing the inbox", function(){
    var inbox;

    beforeEach(function(){
      affix("#email-preview-template div");

      inbox = BBCloneMail.module("Inbox");
      inbox.start();
    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show all messages", function(){
      expect($("#main .email-list li").length).toBe(1);
    });

  });

});
