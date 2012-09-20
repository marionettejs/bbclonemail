describe("mail categories", function(){
  "use strict";

  var categories;

  mockCategoriesAjax();

  beforeEach(function(){
    categories = BBCloneMail.module("MailApp.Categories");
    categories.start();
  });

  afterEach(function(){
    categories.stop();
  });

  describe("when getting categories", function(){
    var async = new AsyncSpec(this);
    var categoryList;

    async.beforeEach(function(done){
      var categoryPromise = BBCloneMail.request("mail:categories");

      categoryPromise.done(function(categories){
        categoryList = categories;
        done();
      });
    });

    it("should return a collection with all the categories in it", function(){
      var category = categoryList.at(0);
      expect(category.get("name")).toBe("some category");
    });

  });

});
