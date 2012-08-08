function mockMailModule(){
  var mockMail = {
    getInbox: function(){
      var m1 = new Backbone.Model();
      var collection = new Backbone.Collection([m1]);
      var deferred = $.Deferred();
      deferred.resolve(collection);
      return deferred.promise();
    }
  };

  beforeEach(function(){
    this._original_mail = BBCloneMail.Mail;
    BBCloneMail.Mail = mockMail;
  });

  afterEach(function(){
    BBCloneMail.Mail = this._original_mail;
  });
}
