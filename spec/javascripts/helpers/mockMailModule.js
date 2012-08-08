function mockMailModule(){
  var mockMail = {
    getInbox: function(){
      var m1 = new Backbone.Model();
      return new Backbone.Collection([m1]);
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
