describe("application layout", function(){

  beforeEach(function(){

  });

  describe("when the application starts", function(){
    var controller;

    beforeEach(function(){
      affix("section.content .container");

      var appLayout = BBCloneMail.module("AppLayout");
      appLayout.start();

      controller = appLayout.controller;
    });

    it("should attach the layout to the main content", function(){
      expect(controller.layout.$el).toEqual($("section.content"));
    });
  });

});
