describe("mail", function(){
  "use strict";

  mockMailAjax();

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
    var emailList;

    async.beforeEach(function(done){
        var emailPromise = BBCloneMail.request("mail:inbox");

        emailPromise.done(function(mail){
          emailList = mail;
          done();
        });
    });

    it("should return a collection with all the mail in it", function(){
      var email = emailList.at(0);
      expect(email.get("from")).toBe("bob");
    });

  });

});
