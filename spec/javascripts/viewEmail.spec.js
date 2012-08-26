describe("viewing an email", function(){

  describe("when clicking an email preview", function(){
    var mailbox;

    beforeEach(function(){
      affix("article#main; #email-view-template li");

      BBCloneMail.main.reset();
      BBCloneMail.main.ensureEl();

      mailbox = BBCloneMail.module("Mailbox");
      mailbox.start();

      var email = new Backbone.Model();
      
      BBCloneMail.execute("show:mail:item", email);
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the full email contents", function(){
      var el = $("#main .email-list li");
      expect(el.length).toBe(1);
    });

  });

});
