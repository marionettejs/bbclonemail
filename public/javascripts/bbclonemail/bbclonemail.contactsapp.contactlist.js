BBCloneMail.module("ContactsApp.ContactList", function(ContactList, App, Backbone, Marionette, $, _){
  "use strict";

  // Contact List Views
  // ------------------

  ContactList.ContactView = Marionette.ItemView.extend({
    template: "#contact-item-template",
    tagName: "li"
  });

  ContactList.ContactListView = Marionette.CollectionView.extend({
    itemView: ContactList.ContactView,
    tagName: "ul",
    id: "contact-list",
    className: "contact-list"
  });

});
