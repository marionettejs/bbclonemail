mockCategoriesAjax = function(){
  var mockJaxId;

  beforeEach(function(){
    mockJaxId = $.mockjax({
      url: "/categories",
      status: "200",
      responseTime: 0,
      contentType: "application/json",
      responseText: [{
        name: "some category"
      }]
    });
  });

  afterEach(function(){
    $.mockjaxClear(mockJaxId);
  });
}
