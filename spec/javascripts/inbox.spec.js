describe("inbox", function(){

  var mockMail = {
    getInbox: function(){
      var m1 = new Backbone.Model();
      return new Backbone.Collection([m1]);
    }
  };

  describe("when viewing the inbox", function(){
    var inbox;

    beforeEach(function(){
      affix("article#main");
      affix("#email-preview-template div");

      BBCloneMail.Mail = mockMail;

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
