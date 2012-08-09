describe("viewing an email", function(){

  mockMailModule();

  describe("when clicking an email preview", function(){
    var inbox;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");

      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      inbox.controller.showInbox();

      console.log($("#main")[0]);
      $("#email-list li").trigger("click");
    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show the full email contents", function(){
      console.log($("#main")[0]);
    });

  });

});
