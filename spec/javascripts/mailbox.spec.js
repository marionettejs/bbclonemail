describe("mailbox", function(){
  "use strict";

  describe("when showing an email collection", function(){
    var mailbox, email;

    beforeEach(function(){
      affix("#email-preview-template div");
      affix("article#main");

      mailbox = BBCloneMail.module("MailApp.Mailbox");
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

  describe("when clicking an email preview", function(){
    var mailbox, view, email;

    beforeEach(function(){
      startHistory();

      affix("#email-preview-template div");
      affix("#email-view-template li");
      affix("article#main");

      email = new Backbone.Model();
      var emailList = new Backbone.Collection([email]);
      
      mailbox = BBCloneMail.module("MailApp.Mailbox");
      mailbox.start();

      spyOn(mailbox.controller, "showMailItem").andCallThrough();
      BBCloneMail.execute("show:mail:list", emailList);

      var el = $("#main .email-list li");
      el.trigger("click");
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the selected email", function(){
      expect(mailbox.controller.showMailItem).toHaveBeenCalledWith(email);
    });

  });

  describe("when showing an individual email", function(){
    var mailbox, email;

    beforeEach(function(){
      startHistory();
      affix("article#main; #email-view-template li");

      BBCloneMail.main.reset();
      BBCloneMail.main.ensureEl();

      mailbox = BBCloneMail.module("MailApp.Mailbox");
      mailbox.start();

      email = new Backbone.Model({id: 1});
      
      BBCloneMail.execute("show:mail:item", email);
    });

    afterEach(function(){
      mailbox.stop();
    });

    it("should show the full email contents", function(){
      var el = $("#main .email-list li");
      expect(el.length).toBe(1);
    });

    it("should route to that email", function(){
      expect(window.location.hash).toBe("#inbox/mail/" + email.id);
    });

  });

});
