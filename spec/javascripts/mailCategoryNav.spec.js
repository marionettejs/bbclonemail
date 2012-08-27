describe("mail app init", function(){

  mockCategoriesAjax();

  describe("when the mail app initializes", function(){
    var async = new AsyncSpec(this);
    var categoryNav;

    async.beforeEach(function(done){
      affix("#mail-categories-view-template div");

      categoryNav = BBCloneMail.module("MailApp.CategoryNavigation");

      categoryNav.start();

      done();
    });

    afterEach(function(){
      categoryNav.stop();
    });

    it("should show the list of categories", function(){
      var el = $("#navigation ul li");
      expect(el.length).toBe(1);
    });

  });

});
