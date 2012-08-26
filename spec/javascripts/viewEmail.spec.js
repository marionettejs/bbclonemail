describe("viewing an email", function(){

  mockMailModule();

  describe("when clicking an email preview", function(){
    var mailbox;

    beforeEach(function(){
      BBCloneMail.main.reset();
      affix("article#main");
      affix("#email-view-template div");

      BBCloneMail.main.ensureEl();
      console.log(BBCloneMail.main.$el[0]);

      mailbox = BBCloneMail.module("Mailbox");
      mailbox.start();

      var email = new Backbone.Model();
      
      var el = $("#main");

      BBCloneMail.execute("show:mail:item", email);
      console.log(BBCloneMail.main.$el[0]);
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
