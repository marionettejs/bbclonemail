describe("mail", function(){

  var mail;

  beforeEach(function(){
    mail = BBCloneMail.module("MailApp.Mail");
    mail.start();
  });

  afterEach(function(){
    mail.stop();
  });

  describe("when getting mail for the inbox", function(){
    var async = new AsyncSpec(this);

    var mockJaxId, emailList;

    async.beforeEach(function(done){

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

        var emailPromise = mail.getInbox();
        emailPromise.done(function(mail){
          emailList = mail;
          done();
        });

    });

    async.afterEach(function(done){
      $.mockjaxClear(mockJaxId);
      done();
    });

    it("should return a collection with all the mail in it", function(){
      var email = emailList.at(0);
      expect(email.get("from")).toBe("bob");
    });

  });

});
