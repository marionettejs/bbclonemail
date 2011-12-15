BBCloneMail.MailApp = (function(BBCloneMail, Backbone){
  var MailApp = {};

  MailApp.EmailListView = Backbone.View.extend({
    tagName: "ul",
    className: "email-list",
    template: "#email-list-view-template"
  });

  MailApp.MailCategoriesView = Backbone.View.extend({
    template: "#mail-categories-view-template"
  });

  MailApp.show = function(){
    BBCloneMail.mainRegion.show(new MailApp.EmailListView());
    BBCloneMail.navigationRegion.show(new MailApp.MailCategoriesView());
    console.log(BBCloneMail.navigationRegion);
  };
  
  return MailApp;
})(BBCloneMail, Backbone);
