describe("inbox", function(){
  "use strict";

  var showMailItemHandler, showMailListHandler, getInboxHandler;

  beforeEach(function(){
    showMailItemHandler = jasmine.createSpy();
    showMailListHandler = jasmine.createSpy();
    getInboxHandler = jasmine.createSpy();

    BBCloneMail.registerCommand("show:mail:item", showMailItemHandler);
    BBCloneMail.registerCommand("show:mail:list", showMailListHandler);
    BBCloneMail.respondTo("mail:inbox", getInboxHandler);

    var emailItem = new Backbone.Model({id: 1});
    var emailList = new Backbone.Collection([emailItem]);
    getInboxHandler.andReturn(emailList);
  });

  afterEach(function(){
    BBCloneMail.removeCommand("show:mail:item");
    BBCloneMail.removeCommand("show:mail:list");
    BBCloneMail.removeRequestHandler("mail:inbox");
  });

  describe("when viewing the inbox", function(){
    var inbox;

    beforeEach(function(){

      inbox = BBCloneMail.module("MailApp.Inbox");
      inbox.start();

      inbox.controller.showInbox();
    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show all messages", function(){
      expect(showMailListHandler.wasCalled).toBe(true);
    });

  });

  describe("when routing to an individual email", function(){
    var inbox, email;

    beforeEach(function(){
      affix("article#main; #email-view-template li");

      BBCloneMail.main.reset();
      BBCloneMail.main.ensureEl();

      inbox = BBCloneMail.module("MailApp.Inbox");
      inbox.start();

      window.location.hash = "inbox/mail/1";
      startHistory();
    });

    afterEach(function(){
      inbox.stop();
    });

    it("should show the full email contents", function(){
      expect(showMailItemHandler.wasCalled).toBe(true);
    });

  });

});
