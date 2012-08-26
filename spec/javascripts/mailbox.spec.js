describe("mailbox", function(){

  describe("when showing an email collection", function(){
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

  describe("when show an individual email", function(){
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
