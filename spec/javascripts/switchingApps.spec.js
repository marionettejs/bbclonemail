describe("switching apps", function(){
  "use strict";

  var mailApp, contactsApp;

  beforeEach(function(){
    mailApp = BBCloneMail.module("MailApp");
    contactsApp = BBCloneMail.module("ContactsApp");
  });

  describe("when starting the mail app", function(){
    var mailAppStart, contactsAppStop;

    beforeEach(function(){
      BBCloneMail.currentApp = contactsApp;
      mailAppStart = spyOn(mailApp, "start");
      contactsAppStop = spyOn(contactsApp, "stop");

      BBCloneMail.execute("start:app", "MailApp");
    });

    it("should shut down the contacts app", function(){
      expect(contactsAppStop).toHaveBeenCalled();
    });

    it("should start the mail app", function(){
      expect(mailAppStart).toHaveBeenCalled();
    });
  });

  describe("when starting the contacts app", function(){
    var mailAppStop, contactsAppStart;

    beforeEach(function(){
      BBCloneMail.currentApp = mailApp;
      mailAppStop = spyOn(mailApp, "stop");
      contactsAppStart = spyOn(contactsApp, "start");

      BBCloneMail.execute("start:app", "ContactsApp");
    });

    it("should shut down the mail app", function(){
      expect(mailAppStop).toHaveBeenCalled();
    });

    it("should start the contacts app", function(){
      expect(contactsAppStart).toHaveBeenCalled();
    });
  });

  xdescribe("when routing to the mail app", function(){
  });

  xdescribe("when routing to the contacts app", function(){
  });

});
