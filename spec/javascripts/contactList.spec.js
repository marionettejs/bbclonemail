describe("contacts list", function(){
  "use strict";

  mockContactsAjax();
 
  describe("when starting the contact list", function(){
    var requestHandler, ContactList;

    beforeEach(function(){
      startHistory();
      affix("#contact-item-template div[text=Joe Johnson]");
      affix("article#main");

      requestHandler = spyOn(BBCloneMail, "request").andReturn(
        new Backbone.Collection([{ name: "Joe Johnson" }])
      );

      ContactList = BBCloneMail.module("ContactsApp.ContactList");

      ContactList.start();
    });

    afterEach(function(){
      ContactList.stop();
    });

    it("should load the contacts", function(){
      expect(requestHandler).toHaveBeenCalled();
    });

    it("should show the list of contacts", function(){
      expect(BBCloneMail.main.$el).toHaveText("Joe Johnson");
    });

    it("should navigate to the #contacts route", function(){
      expect(window.location.hash).toBe("#contacts");
    });

  });
});
