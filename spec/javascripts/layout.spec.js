describe("application layout", function(){
  "use strict";

  describe("when the application starts", function(){
    var appLayout, controller;

    beforeEach(function(){
      affix("section.content .container");

      appLayout = BBCloneMail.module("AppLayout");
      appLayout.start();

      controller = appLayout.controller;
    });

    afterEach(function(){
      appLayout.stop();
    });

    it("should attach the layout to the main content", function(){
      expect(controller.layout.$el).toEqual($("section.content"));
    });

  });

  describe("given the app layout in place", function(){
    var appLayout, startHandler;

    beforeEach(function(){
      affix("section.content .container #app-selector select option[value=MailApp]+option[value=ContactsApp]");

      startHandler = spyOn(BBCloneMail, "execute");

      appLayout = BBCloneMail.module("AppLayout");
      appLayout.start();
    });

    afterEach(function(){
      appLayout.stop();
    });

    describe("when selecting the mail app", function(){
      beforeEach(function(){
        var $app = $("#app-selector select");

        $app.val("MailApp");
        $app.trigger("change");
      });

      it("should switch to the mail app", function(){
        expect(startHandler).toHaveBeenCalledWith("start:app", "MailApp");
      });
    });

    describe("when selecting the contacts app", function(){
      beforeEach(function(){
        var $app = $("#app-selector select");

        $app.val("ContactsApp");
        $app.trigger("change");
      });

      it("should switch to the contacts app", function(){
        expect(startHandler).toHaveBeenCalledWith("start:app", "ContactsApp");
      });
    });
  });

});
