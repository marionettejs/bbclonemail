describe("mailbox", function(){

  describe("when showing mail", function(){
    var mailbox, email;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");
      mockMailView = jasmine.createSpy();

      mailbox = BBCloneMail.module("Mailbox");
      mailbox.start();

      email = new Backbone.Collection([{}]);
      
      BBCloneMail.execute("show:mail:list", email);
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the mail", function(){
      expect($("#main .email-list li").length).toBe(1);
    });
  });

});
