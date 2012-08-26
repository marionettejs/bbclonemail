describe("mailbox", function(){

  describe("when showing mail", function(){
    var mailbox, email;

    beforeEach(function(){
      affix("#email-preview-template div");
      affix("article#main");

      mailbox = BBCloneMail.module("Mailbox");
      mailbox.start();

      email = new Backbone.Collection([{}]);
      
      BBCloneMail.execute("show:mail:list", email);
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the mail", function(){
      var el = $("#main .email-list li");
      expect(el.length).toBe(1);
    });
  });

});
