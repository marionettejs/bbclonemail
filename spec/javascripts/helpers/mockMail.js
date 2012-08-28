mockMailAjax = function(){
  var mockJaxId;

  beforeEach(function(){

    mockJaxId = $.mockjax({
      url: "/email",
      status: "200",
      responseTime: 0,
      contentType: "application/json",
      responseText: [{
        from: "bob",
        to: "joe",
        date: "1/1/2011",
        subject: "test email",
        message: "this is a test email"
      }]
    });

  });

  afterEach(function(){
    $.mockjaxClear(mockJaxId);
  });
}

