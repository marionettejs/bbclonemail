describe("mail router", function(){
  "use strict";

  var router, startMail, inbox;

  beforeEach(function(){
    startHistory();

    startMail = spyOn(BBCloneMail, "startSubApp");

    inbox = BBCloneMail.module("MailApp.Inbox");
    
    router = BBCloneMail.module("MailRouter");
    router.start();
  });

  afterEach(function(){
    router.stop();
    delete inbox.controller;
  });

  function mockControllerMethod(methodName){
    var spy = jasmine.createSpy(methodName);

    inbox.controller = {};
    inbox.controller[methodName] = spy;

    return spy;
  }

  describe("when navigating to the inbox (empty route)", function(){
    var showInbox;

    beforeEach(function(){
      showInbox = mockControllerMethod("showInbox");

      Backbone.history.loadUrl("");
    });

    it("should start the mail app", function(){
      expect(startMail).toHaveBeenCalledWith("MailApp");
    });

    it("should show the inbox", function(){
      expect(showInbox).wasCalled();
    });

  });

  describe("when routing to an individual email", function(){
    var showMailById;

    beforeEach(function(){
      showMailById = mockControllerMethod("showMailById");

      Backbone.history.loadUrl("inbox/mail/1");
    });

    it("should start the mail app", function(){
      expect(startMail).toHaveBeenCalledWith("MailApp");
    });

    it("should show the email by id", function(){
      expect(showMailById).toHaveBeenCalled();
    });

  });

  describe("when navigating to a mail category", function(){
    var showMailByCategory;

    beforeEach(function(){
      showMailByCategory = mockControllerMethod("showMailByCategory");

      Backbone.history.loadUrl("categories/foo");
    });

    it("should start the mail app", function(){
      expect(startMail).toHaveBeenCalledWith("MailApp");
    });

    it("should show the email by category", function(){
      expect(showMailByCategory).toHaveBeenCalled();
    });

  });

});
