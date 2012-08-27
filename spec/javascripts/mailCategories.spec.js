describe("mail categories", function(){
  var categories;

  beforeEach(function(){
    categories = BBCloneMail.module("MailApp.Categories");
    categories.start();
  });

  afterEach(function(){
    categories.stop();
  });

  describe("when getting categories", function(){
    var async = new AsyncSpec(this);

    var mockJaxId, categoryList;

    async.beforeEach(function(done){

        mockJaxId = $.mockjax({
          url: "/categories",
          status: "200",
          responseTime: 0,
          contentType: "application/json",
          responseText: [{
            name: "some category"
          }]
        });

        var categoryPromise = categories.getAll();
        categoryPromise.done(function(categories){
          categoryList = categories;
          done();
        });

    });

    async.afterEach(function(done){
      $.mockjaxClear(mockJaxId);
      done();
    });

    it("should return a collection with all the categories in it", function(){
      var category = categoryList.at(0);
      expect(category.get("name")).toBe("some category");
    });

  });

});
