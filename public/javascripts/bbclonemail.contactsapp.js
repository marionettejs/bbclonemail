BBCloneMail.ContactsApp = (function(BBCloneMail, Backbone){
  var Contacts = {};

  Contacts.ContactListView = Backbone.View.extend({
    tagName: "ul",
    className: "contact-list",
    template: "#contact-list-view-template"
  });

  Contacts.ContactCategoriesView = Backbone.View.extend({
    template: "#contact-categories-view-template"
  });

  Contacts.show = function(){
    BBCloneMail.mainRegion.show(new Contacts.ContactListView());
    BBCloneMail.navigationRegion.show(new Contacts.ContactCategoriesView());
  };
  
  return Contacts;
})(BBCloneMail, Backbone);

