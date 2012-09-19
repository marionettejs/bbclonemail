describe("application layout", function(){

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
      affix("section.content .container select#app-selector option[value=mail]");

      startHandler = jasmine.createSpy("start mail handler");
      BBCloneMail.registerCommand("start:app", startHandler);

      appLayout = BBCloneMail.module("AppLayout");
      appLayout.start();
    });

    afterEach(function(){
      appLayout.stop();
      BBCloneMail.removeCommand("start:app");
    });

    describe("when selecting the mail app", function(){
      beforeEach(function(){
        var $app = $("#app-selector");

        $app.val("mail");
        $app.trigger("change");
      });

      it("should switch to the mail app", function(){
        expect(startHandler).toHaveBeenCalledWith("MailApp");
      });
    });

    describe("when selecting the contacts app", function(){
      beforeEach(function(){
        var $app = $("#app-selector");

        $app.val("contacts");
        $app.trigger("change");
      });

      it("should switch to the contacts app", function(){
        expect(startHandler).toHaveBeenCalledWith("ContactsApp");
      });
    });
  });

});
