describe("inbox", function(){

  mockMailModule();

  describe("when viewing the inbox", function(){
    var inbox;

    beforeEach(function(){
      affix("article#main");
      affix("#email-preview-template div, article#main");

      console.log("about to start the inbox");
      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      console.log("showing the controller", inbox.controller);
      inbox.controller.show();
    });

    afterEach(function(){
      console.log('stopping the module');
    });

    it("should show all messages", function(){
      console.log($("#main")[0]);
      expect($("#main .email-list li").length).toBe(1);
    });

  });

});
