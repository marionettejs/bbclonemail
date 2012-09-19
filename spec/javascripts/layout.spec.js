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

  describe("when selecting the mail app", function(){
    var appLayout, startMailHandler;

    beforeEach(function(){
      affix("section.content .container select#app-selector option[value=mail]");

      startMailHandler = jasmine.createSpy("start mail handler");
      BBCloneMail.registerCommand("start:mailApp", startMailHandler);

      appLayout = BBCloneMail.module("AppLayout");
      appLayout.start();

      var $app = $("#app-selector");
      $app.val("mail");
      $app.trigger("change");
    });

    afterEach(function(){
      appLayout.stop();
    });

    it("should switch to the mail app", function(){
      expect(startMailHandler).toHaveBeenCalled();
    });
  });

});
