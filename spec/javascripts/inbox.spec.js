describe("inbox", function(){
  "use strict";

  var showMailListHandler, getInboxHandler;

  beforeEach(function(){
    showMailListHandler = jasmine.createSpy("show mail list");
    getInboxHandler = jasmine.createSpy("get inbox");

    BBCloneMail.registerCommand("show:mail:list", showMailListHandler);
    BBCloneMail.respondTo("mail:inbox", getInboxHandler);

    var emailItem = new Backbone.Model({id: 1});
    var emailList = new Backbone.Collection([emailItem]);

    var promise = $.Deferred();
    promise.resolve(emailList);
    getInboxHandler.andReturn(promise);
  });

  afterEach(function(){
    BBCloneMail.removeCommand("show:mail:list");
    BBCloneMail.removeRequestHandler("mail:inbox");
  });

  describe("when viewing the inbox", function(){
    var inbox;

    beforeEach(function(){
      startHistory();

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

});
