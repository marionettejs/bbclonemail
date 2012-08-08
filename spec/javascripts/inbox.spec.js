describe("inbox", function(){

  mockMailModule();

  describe("when viewing the inbox", function(){
    var inbox;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");

      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      inbox.controller.show();
      otherMainEl = $("#main");
      console.log(otherMainEl[0].outerHTML);
      console.log(mainEl[0] === otherMainEl[0]);
    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show all messages", function(){
      expect($("#main .email-list li").length).toBe(1);
    });

  });

  describe("when starting the app with an empty route (#)", function(){
    var inbox;

    beforeEach(function(){
      affix("#email-preview-template div, article#main");
      inbox = BBCloneMail.module("Inbox");
      inbox.start();

      Backbone.history.start();
    });

    afterEach(function(){
      Backbone.history.stop();
      inbox.stop();
    });

    it("should show the inbox", function(){
      expect($("#main")).toContainHtml(/<ul class="email-list">/);
    });

  });

});
