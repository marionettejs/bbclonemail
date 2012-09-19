describe("switching apps", function(){

  describe("when switching from the mail app to contacts app", function(){
    var mailAppShutdown, contactsAppStart;

    beforeEach(function(){

    });

    it("should shut down the mail app", function(){
      expect(mailAppShutdown).toHaveBeenCalled();
    });

    it("should start the contacts app", function(){
      expect(contactsAppStart).toHaveBeenCalled();
    });
  });

  describe("when switching from the contacts app to the mail app", function(){
    it("should start the mail app", function(){
      throw "not yet implemented";
    });

    it("should shut down the contacts app", function(){
      throw "not yet implemented";
    });
  });

  xdescribe("when routing to the mail app", function(){
  });

  xdescribe("when routing to the contacts app", function(){
  });

});
