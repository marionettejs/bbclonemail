mockContactsAjax = function(){
  var mockJaxId;

  beforeEach(function(){

    mockJaxId = $.mockjax({
      url: "/contacts",
      status: "200",
      responseTime: 0,
      contentType: "application/json",
      responseText: [{
        id: "09vsjk3209svdjh",
        name: "Joe Johnson",
        email: "joe.johnson@example.com",
        phone: "555-555-5555"
      }]
    });

  });

  afterEach(function(){
    $.mockjaxClear(mockJaxId);
  });
}

