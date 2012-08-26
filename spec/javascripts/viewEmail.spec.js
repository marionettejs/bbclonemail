describe("viewing an email", function(){

  mockMailModule();

  describe("when clicking an email preview", function(){
    var mailbox;

    beforeEach(function(){
      affix("#email-view-template div, article#main");

      mailbox = BBCloneMail.module("Mailbox");
      mailbox.start();

      var email = new Backbone.Model();

      BBCloneMail.execute("show:mail:item", email);
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the full email contents", function(){
      throw new Error("not yet implemented");
    });

  });

});
