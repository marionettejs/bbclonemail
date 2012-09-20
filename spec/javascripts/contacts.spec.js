describe("contacts", function(){
  "use strict";

  mockContactsAjax();

  var contacts;

  beforeEach(function(){
    contacts = BBCloneMail.module("ContactsApp.Contacts");
    contacts.start();
  });

  afterEach(function(){
    contacts.stop();
  });

  describe("when getting contacts", function(){
    var async = new AsyncSpec(this);
    var contactList;

    async.beforeEach(function(done){
        var contactPromise = BBCloneMail.request("contacts:all");

        contactPromise.done(function(list){
          contactList = list;
          done();
        });
    });

    it("should return a collection with all the contacts in it", function(){
      expect(contactList.length).toBe(1);
    });

  });

});

